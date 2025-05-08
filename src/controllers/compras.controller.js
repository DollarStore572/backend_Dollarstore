import { pool } from '../db.js';

// Obtener todas las compras con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerComprasConDetalles = async (req, res) => {
  try {
    const [result] = await pool.query(`
SELECT 
    c.id_compra,
    c.fecha,
    CONCAT(compania) AS nombre_compania,
    p.descripcion AS nombre_producto,
    dc.cantidad,
    dc.precio_compras AS precio_unitario,
    (dc.cantidad * dc.precio_compras) AS subtotal
FROM Compras c
INNER JOIN Detalles_Compras dc ON c.id_compra = dc.id_compra
INNER JOIN Productos p ON dc.id_producto = p.id_producto
iNNER JOIN Proveedores pr ON c.id_proveedor = pr.id_proveedor;
`);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las compras.',
      error: error
    });
  }
};

export const obtenerCompra = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        c.id_compra,
        c.fecha,
        CONCAT(pr.compania) AS nombre_compania,
        SUM(dc.cantidad * dc.precio_compras) AS total_venta
      FROM Compras c
      INNER JOIN Proveedores pr ON c.id_proveedor = pr.id_proveedor
      INNER JOIN Detalles_Compras dc ON c.id_compra = dc.id_compra
      GROUP BY c.id_compra, c.fecha, pr.compania, dc.precio_compras
    `);
    
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las compras.',
      error: error.message
    });
  }
};