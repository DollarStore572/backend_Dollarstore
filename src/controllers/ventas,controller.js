import { pool } from '../db.js';

// Obtener todas las ventas con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerVentasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
            SELECT 
            v.id_venta,
            dv.id_detalle_venta,
            t.fecha,
            CONCAT(c.nombre, ' ', c.apellido) AS nombre_cliente,
            p.descripcion AS nombre_producto,
            dv.cantidad,
            dv.precio_detalle AS precio_unitario,
            (dv.cantidad * dv.precio_detalle) AS subtotal
        FROM Ventas v
        INNER JOIN Clientes c ON v.id_cliente = c.id_cliente
        INNER JOIN Detalles_Ventas dv ON v.id_venta = dv.id_venta
        INNER JOIN Productos p ON dv.id_producto = p.id_producto
        INNER JOIN Tiempo t ON v.id_tiempo = t.id_tiempo;
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las ventas.',
      error: error
    });
  }
};