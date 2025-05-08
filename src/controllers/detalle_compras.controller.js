
import { pool } from '../db.js';


// Obtener todas las ventas con sus detalles, mostrando nombres, IDs y subtotal
export const obtenerComprasConDetalles = async (req, res) => {
    try {
      const [result] = await pool.query(`
        SELECT 
          c.id_compra,
          dc.id_detalle_compra,
          c.fecha,
          CONCAT(pr.compania) AS nombre_compania,
          p.nombre_producto,
          dc.cantidad,
          dc.precio_compras,
          (dc.cantidad * dc.precio_compras) AS subtotal
        FROM Compras c
        INNER JOIN Proveedores pr ON c.id_proveedor = pr.id_proveedor
        INNER JOIN Detalles_Compras dc ON c.id_compra = dc.id_compra
        INNER JOIN Productos p ON dc.id_producto = p.id_producto;
      `);
      
      res.json(result);
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al leer los datos de las compra.',
        error: error
      });
    }
  };
