import { pool } from "../db.js";

// Obtener todas las compras con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerComprasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
SELECT 
    c.id_compra,
    c.fecha,
    pr.compania AS nombre_compania,
    p.id_producto,
    p.nombre_producto,
    dc.cantidad,
    dc.precio_compras,
    (dc.cantidad * dc.precio_compras) AS subtotal
FROM Compras c
INNER JOIN Detalles_Compras dc ON c.id_compra = dc.id_compra
INNER JOIN Productos p ON dc.id_producto = p.id_producto
INNER JOIN Proveedores pr ON c.id_proveedor = pr.id_proveedor
ORDER BY c.id_compra DESC
`);
    
    res.json(result);
  } catch (error) {
    console.error("Error en obtenerComprasConDetalles:", error);
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las compras.",
      error: error.message,
    });
  }
};

export const obtenerCompras = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        c.id_compra,
        c.fecha,
        pr.compania AS nombre_compania,
        SUM(dc.cantidad * dc.precio_compras) AS total_venta
      FROM Compras c
      INNER JOIN Proveedores pr ON c.id_proveedor = pr.id_proveedor
      INNER JOIN Detalles_Compras dc ON c.id_compra = dc.id_compra
      GROUP BY c.id_compra, c.fecha, pr.compania
      ORDER BY c.id_compra DESC
    `);
    
    res.json(result);
  } catch (error) {
    console.error("Error en obtenerCompras:", error);
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al leer los datos de las compras.",
      error: error.message,
    });
  }
};

// Eliminar una compra (los detalles se eliminan explícitamente primero)
export const eliminarCompra = async (req, res) => {
  try {
    const { id_compra } = req.params;

    // Eliminar detalles primero para evitar errores de clave foránea
    await pool.query("DELETE FROM Detalles_Compras WHERE id_compra = ?", [id_compra]);

    const [result] = await pool.query("DELETE FROM Compras WHERE id_compra = ?", [id_compra]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Compra no encontrada" });
    }

    res.json({ mensaje: "Compra y sus detalles eliminados correctamente" });
  } catch (error) {
    console.error("Error en eliminarCompra:", error);
    return res.status(500).json({
      mensaje: "Error al eliminar la compra",
      error: error.message,
    });
  }
};

// Registrar una nueva compra con detalles
export const registrarCompra = async (req, res) => {
  const { id_proveedor, fecha, detalles } = req.body;

  try {
    const [compraResult] = await pool.query(
      "INSERT INTO Compras (id_proveedor, fecha) VALUES (?, ?)",
      [id_proveedor, fecha]
    );

    const id_compra = compraResult.insertId;

    for (const detalle of detalles) {
      await pool.query(
        "INSERT INTO Detalles_Compras (id_compra, id_producto, cantidad, precio_compras) VALUES (?, ?, ?, ?)",
        [id_compra, detalle.id_producto, detalle.cantidad, detalle.precio_compra]
      );
      await pool.query(
        "UPDATE Productos SET existencia = existencia + ? WHERE id_producto = ?",
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: "Compra registrada correctamente" });
  } catch (error) {
    console.error("Error en registrarCompra:", error);
    res.status(500).json({ mensaje: "Error al registrar la compra", error: error.message });
  }
};

// Actualizar una compra con sus detalles
export const actualizarCompra = async (req, res) => {
  const { id_compra } = req.params;
  console.log("ID recibido en actualizarCompra:", id_compra); // Depuración
  if (!id_compra || isNaN(id_compra)) {
    return res.status(400).json({ mensaje: "ID de compra no válido" });
  }

  const { id_proveedor, fecha, detalles } = req.body;

  try {
    // Actualizar la compra
    const [compraResult] = await pool.query(
      "UPDATE Compras SET id_proveedor = ?, fecha = ? WHERE id_compra = ?",
      [id_proveedor, fecha, id_compra]
    );

    if (compraResult.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Compra no encontrada" });
    }

    // Obtener detalles actuales para restaurar stock
    const [detallesActuales] = await pool.query(
      "SELECT id_producto, cantidad FROM Detalles_Compras WHERE id_compra = ?",
      [id_compra]
    );

    // Restaurar stock de productos anteriores
    for (const detalle of detallesActuales) {
      await pool.query(
        "UPDATE Productos SET existencia = existencia - ? WHERE id_producto = ?",
        [detalle.cantidad, detalle.id_producto]
      );
    }

    // Eliminar detalles actuales
    await pool.query("DELETE FROM Detalles_Compras WHERE id_compra = ?", [id_compra]);

    // Insertar nuevos detalles y actualizar existencia
    for (const detalle of detalles) {
      await pool.query(
        "INSERT INTO Detalles_Compras (id_compra, id_producto, cantidad, precio_compras) VALUES (?, ?, ?, ?)",
        [id_compra, detalle.id_producto, detalle.cantidad, detalle.precio_compra]
      );
      await pool.query(
        "UPDATE Productos SET existencia = existencia + ? WHERE id_producto = ?",
        [detalle.cantidad, detalle.id_producto]
      );
    }

    res.json({ mensaje: "Compra actualizada correctamente" });
  } catch (error) {
    console.error("Error en actualizarCompra:", error);
    res.status(500).json({ mensaje: "Error al actualizar la compra", error: error.message });
  }
};

// Obtener una compra específica por id_compra
export const obtenerCompraPorId = async (req, res) => {
  try {
    const { id_compra } = req.params;

    const [result] = await pool.query(
      `SELECT 
        id_compra,
        id_proveedor,
        fecha
      FROM Compras
      WHERE id_compra = ?`,
      [id_compra]
    );

    if (result.length === 0) {
      return res.status(404).json({ mensaje: "Compra no encontrada" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error en obtenerCompraPorId:", error);
    return res.status(500).json({
      mensaje: "Ha ocurrido un error al obtener los datos de la compra.",
      error: error.message,
    });
  }
};

