import { pool } from '../db.js';

// Obtener todas las ventas con sus detalles
export const obtenerVentasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
    v.id_venta,
    dv.id_detalle_venta,
    v.fecha,
    CONCAT(c.nombre, ' ', c.apellido) AS nombre_cliente,
    p.descripcion AS nombre_producto,
    dv.cantidad,
    dv.precio_ventas AS precio_unitario,
    (dv.cantidad * dv.precio_ventas) AS subtotal
  FROM Ventas v
  INNER JOIN Clientes c ON v.id_cliente = c.id_cliente
  INNER JOIN Detalles_Ventas dv ON v.id_venta = dv.id_venta
  INNER JOIN Productos p ON dv.id_producto = p.id_producto;
    `); 
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error.message
    });
  }
};

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        v.id_venta,
        v.fecha,
        CONCAT(c.nombre, ' ', c.apellido) AS nombre_cliente,
        SUM(dv.cantidad * dv.precio_ventas) AS total_venta
      FROM Ventas v
      INNER JOIN Clientes c ON v.id_cliente = c.id_cliente
      INNER JOIN Detalles_Ventas dv ON v.id_venta = dv.id_venta
      GROUP BY v.id_venta, v.fecha, c.nombre, c.apellido
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error.message
    });
  }
};

export const eliminarVenta = async (req, res) => {
  try {
      const { id_venta } = req.params;

      // Eliminar primero los detalles asociados en Detalles_Ventas
      await pool.query('DELETE FROM Detalles_Ventas WHERE id_venta = ?', [id_venta]);

      // Luego eliminar la venta en Ventas
      const [result] = await pool.query('DELETE FROM Ventas WHERE id_venta = ?', [id_venta]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Venta no encontrada' });
      }

      res.json({ message: 'Venta eliminada exitosamente' });
  } catch (error) {
      console.error('Error en eliminarVenta:', error);
      res.status(500).json({ message: error.message });
  }
};

// Registrar una nueva venta con detalles
export const registrarVenta = async (req, res) => {
  const { id_cliente, fecha, detalles } = req.body;

  try {
    const [ventaResult] = await pool.query(
      'INSERT INTO Ventas (id_cliente, fecha) VALUES (?, ?)',
      [id_cliente, fecha]
    );

    const id_venta = ventaResult.insertId;

    for (const detalle of detalles) {
      await pool.query(
        'INSERT INTO Detalles_Ventas (id_venta, id_producto, cantidad, precio_ventas) VALUES (?, ?, ?, ?)',
        [id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_ventas]
      );
      await pool.query(
        'UPDATE Productos SET existencia = existencia - ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Venta registrada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar la venta', error: error.message });
  }
};

// Actualizar una venta con sus detalles
export const actualizarVenta = async (req, res) => {
  const { id_venta } = req.params;
  const { id_cliente, id_tiempo, detalles } = req.body;

  try {
    // Actualizar la venta
    const [ventaResult] = await pool.query(
      'UPDATE Ventas SET id_cliente = ?, id_tiempo = ? WHERE id_venta = ?',
      [id_cliente, id_tiempo, id_venta]
    );

    if (ventaResult.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Obtener detalles actuales para restaurar existencia
    const [detallesActuales] = await pool.query(
      'SELECT id_producto, cantidad FROM Detalles_Ventas WHERE id_venta = ?',
      [id_venta]
    );

    // Restaurar existencia de productos anteriores
    for (const detalle of detallesActuales) {
      await pool.query(
        'UPDATE Productos SET existencia = existencia + ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    // Eliminar detalles actuales
    await pool.query('DELETE FROM Detalles_Ventas WHERE id_venta = ?', [id_venta]);

    // Insertar nuevos detalles y actualizar existencia
    for (const detalle of detalles) {
      await pool.query(
        'INSERT INTO Detalles_Ventas (id_venta, id_producto, cantidad, precio_ventas) VALUES (?, ?, ?, ?)',
        [id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_ventas]
      );
      await pool.query(
        'UPDATE Productos SET existencia = existencia - ? WHERE id_producto = ?',
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: 'Venta actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la venta', error: error.message });
  }
};

// Obtener una venta específica por id_venta
export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id_venta } = req.params;

    const [venta] = await pool.query(`
      SELECT 
        v.id_venta,
        v.id_cliente,
        v.fecha,
        t.fecha,
        CONCAT(c.nombre, ' ', c.apellido) AS nombre_cliente
      FROM Ventas v
      INNER JOIN Clientes c ON v.id_cliente = c.id_cliente
      WHERE id_venta = ?
    `, [id_venta]);

    if (venta.length === 0) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    res.json(venta[0]); // Devuelve solo el primer objeto (una sola venta)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener los datos de la venta.',
      error: error.message
    });
  }
};