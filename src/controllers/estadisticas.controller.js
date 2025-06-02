import { pool2 } from '../db.js';

// 1.1 Total de ventas por día
export const totalVentasPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT DATE_FORMAT(t.fecha, '%Y-%m-%d') AS dia, ROUND(SUM(hv.cantidad * hv.precio), 1) AS total_ventas
       FROM Hecho_venta hv
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY t.fecha
       ORDER BY t.fecha;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas por día.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por día.',
      error: error.message,
    });
  }
};

// 1.2 Total de ventas por mes
export const totalVentasPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.mes, ROUND(SUM(hv.cantidad * hv.precio), 1) AS total_ventas
       FROM Hecho_venta hv
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY t.mes
       ORDER BY t.mes;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas por mes.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por mes.',
      error: error.message,
    });
  }
};

// 1.3 Total de ventas por año
export const totalVentasPorAnio = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.año, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_ventas
       FROM Hecho_venta hv
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY t.año
       ORDER BY t.año;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas por año.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por año.',
      error: error.message,
    });
  }
};

// 3.1 Total de compras por cliente
export const totalComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre, c.apellido, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_compras
       FROM Hecho_venta hv
       JOIN Dim_cliente c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.nombre, c.apellido
       ORDER BY total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de compras por cliente.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de compras por cliente.',
      error: error.message,
    });
  }
};

// 3.2 Cantidad de compras por cliente
export const cantidadComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre, c.apellido, COUNT(DISTINCT hv.id_venta) AS cantidad_compras
       FROM Hecho_venta hv
       JOIN Dim_cliente c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.nombre, c.apellido
       ORDER BY cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de cantidad de compras por cliente.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de cantidad de compras por cliente.',
      error: error.message,
    });
  }
};

// 3.3 Total de compras por cliente y mes
export const totalComprasPorClienteMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre, c.apellido, t.año, t.mes, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_compras
       FROM Hecho_venta hv
       JOIN Dim_cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.nombre, c.apellido, t.año, t.mes
       ORDER BY t.año, t.mes, total_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de compras por cliente y mes.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de compras por cliente y mes.',
      error: error.message,
    });
  }
};

// 4.1 Productos más vendidos por cantidad
export const productosMasVendidosCantidad = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_venta hv
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       GROUP BY p.id_producto, p.nombre_producto
       ORDER BY cantidad_vendida DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de productos más vendidos por cantidad.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de productos más vendidos por cantidad.',
      error: error.message,
    });
  }
};

// 4.2 Productos más vendidos por valor total
export const productosMasVendidosValor = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_venta hv
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       GROUP BY p.id_producto, p.nombre_producto
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de productos más vendidos por valor total.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de productos más vendidos por valor total.',
      error: error.message,
    });
  }
};

// 4.3 Ventas de productos por mes
export const ventasProductosPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, t.año, t.mes, SUM(hv.cantidad) AS cantidad_vendida, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_ventas
       FROM Hecho_venta hv
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY p.id_producto, p.nombre_producto, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas de productos por mes.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas de productos por mes.',
      error: error.message,
    });
  }
};

// 5.1 Total de ventas por categoría
export const totalVentasPorCategoria = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.categoria AS nombre_categoria, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_venta hv
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       GROUP BY p.categoria
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas por categoría.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por categoría.',
      error: error.message,
    });
  }
};

// 5.2 Total de ventas por categoría y mes
export const ventasCategoriaPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.categoria AS nombre_categoria, t.año, t.mes, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_venta hv
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY p.categoria, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas por categoría y mes.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por categoría y mes.',
      error: error.message,
    });
  }
};

// 10.1 Productos con bajo stock
export const productosBajoStock = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, p.existencia AS stock
       FROM Dim_producto p
       WHERE p.existencia < 50
       ORDER BY p.existencia ASC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron productos con bajo stock.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de productos con bajo stock.',
      error: error.message,
    });
  }
};

// 10.2 Stock por categoría
export const stockPorCategoria = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.categoria AS nombre_categoria, SUM(p.existencia) AS stock_total
       FROM Dim_producto p
       GROUP BY p.categoria
       ORDER BY stock_total DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de stock por categoría.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de stock por categoría.',
      error: error.message,
    });
  }
};

// 11.3 Ventas por cliente, categoría y mes
export const ventasClienteCategoriaMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre AS cliente_nombre, c.apellido AS cliente_apellido,
              p.categoria AS nombre_categoria, t.año, t.mes, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_ventas
       FROM Hecho_venta hv
       JOIN Dim_cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.nombre, c.apellido,
                p.categoria, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas por cliente, categoría y mes.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por cliente, categoría y mes.',
      error: error.message,
    });
  }
};

// 14.1 Clientes que compran más frecuentemente
export const clientesFrecuentes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre, c.apellido,
              COUNT(DISTINCT hv.id_venta) AS cantidad_compras,
              ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_compras
       FROM Hecho_venta hv
       JOIN Dim_cliente c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.nombre, c.apellido
       HAVING COUNT(DISTINCT hv.id_venta) > 1
       ORDER BY cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de clientes frecuentes.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de clientes frecuentes.',
      error: error.message,
    });
  }
};

// 14.2 Clientes frecuentes por mes
export const clientesFrecuentesPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre, c.apellido,
              t.año, t.mes, COUNT(DISTINCT hv.id_venta) AS cantidad_compras
       FROM Hecho_venta hv
       JOIN Dim_cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.nombre, c.apellido,
                t.año, t.mes
       HAVING COUNT(DISTINCT hv.id_venta) > 1
       ORDER BY t.año, t.mes, cantidad_compras DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de clientes frecuentes por mes.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de clientes frecuentes por mes.',
      error: error.message,
    });
  }
};

// 15.1 Productos más comprados por cliente
export const productosPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre, c.apellido,
              p.nombre_producto, SUM(hv.cantidad) AS cantidad_comprada,
              ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_gastado
       FROM Hecho_venta hv
       JOIN Dim_cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       GROUP BY c.id_cliente, c.nombre, c.apellido,
                p.id_producto, p.nombre_producto
       ORDER BY total_gastado DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de productos más comprados por cliente.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de productos más comprados por cliente.',
      error: error.message,
    });
  }
};

// 15.2 Categorías más compradas por cliente
export const categoriasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.nombre, c.apellido,
              p.categoria AS nombre_categoria, SUM(hv.cantidad) AS cantidad_comprada,
              ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_gastado
       FROM Hecho_venta hv
       JOIN Dim_cliente c ON hv.id_cliente = c.id_cliente
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       GROUP BY c.id_cliente, c.nombre, c.apellido,
                p.categoria
       ORDER BY total_gastado DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de categorías más compradas por cliente.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de categorías más compradas por cliente.',
      error: error.message,
    });
  }
};

// 16.1 Total de ventas por día de la semana
export const totalVentasPorDiaSemana = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.dia AS dia_semana, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_ventas
       FROM Hecho_venta hv
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY t.dia
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas por día de la semana.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por día de la semana.',
      error: error.message,
    });
  }
};

// 16.2 Ventas por categoría y día de la semana
export const ventasCategoriaPorDiaSemana = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.categoria AS nombre_categoria, t.dia AS dia_semana, ROUND(SUM(hv.cantidad * hv.precio), 2) AS total_ventas
       FROM Hecho_venta hv
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       JOIN Dim_tiempo t ON hv.fecha = t.fecha
       GROUP BY p.categoria, t.dia
       ORDER BY total_ventas DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de ventas por categoría y día de la semana.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas por categoría y día de la semana.',
      error: error.message,
    });
  }
};

// 17.1 Productos con mayor rotación
export const productosMayorRotacion = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, p.existencia AS stock_inicial,
              SUM(hv.cantidad) AS total_vendido,
              (SUM(hv.cantidad) / p.existencia) AS tasa_rotacion
       FROM Hecho_venta hv
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       WHERE p.existencia > 0
       GROUP BY p.id_producto, p.nombre_producto, p.existencia
       ORDER BY tasa_rotacion DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de productos con mayor rotación.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de productos con mayor rotación.',
      error: error.message,
    });
  }
};

// 17.2 Categorías con mayor rotación
export const categoriasMayorRotacion = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.categoria AS nombre_categoria,
              SUM(p.existencia) AS stock_total,
              SUM(hv.cantidad) AS total_vendido,
              (SUM(hv.cantidad) / SUM(p.existencia)) AS tasa_rotacion
       FROM Hecho_venta hv
       JOIN Dim_producto p ON hv.id_producto = p.id_producto
       GROUP BY p.categoria
       HAVING SUM(p.existencia) > 0
       ORDER BY tasa_rotacion DESC;`
    );
    if (result.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron estadísticas de categorías con mayor rotación.',
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al obtener las estadísticas de categorías con mayor rotación.',
      error: error.message,
    });
  }
};