import { Router } from 'express';
import { 
  totalVentasPorDia, 
  totalVentasPorMes, 
  totalVentasPorAnio, 
  totalComprasPorCliente, 
  cantidadComprasPorCliente, 
  totalComprasPorClienteMes, 
  productosMasVendidosCantidad, 
  productosMasVendidosValor, 
  ventasProductosPorMes, 
  totalVentasPorCategoria, 
  ventasCategoriaPorMes, 
  productosBajoStock, 
  stockPorCategoria, 
  ventasClienteCategoriaMes, 
  clientesFrecuentes, 
  clientesFrecuentesPorMes, 
  productosPorCliente, 
  categoriasPorCliente, 
  totalVentasPorDiaSemana, 
  ventasCategoriaPorDiaSemana, 
  productosMayorRotacion, 
  categoriasMayorRotacion 
} from '../controllers/estadisticas.controller.js';

const router = Router();

// 1. Análisis de Ventas por Dimensión Tiempo
router.get('/totalventaspordia', totalVentasPorDia);
router.get('/totalventaspormes', totalVentasPorMes);
router.get('/totalventasporanio', totalVentasPorAnio);

// 3. Análisis de Ventas por Cliente
router.get('/totalcomprasporcliente', totalComprasPorCliente);
router.get('/cantidadcomprasporcliente', cantidadComprasPorCliente);
router.get('/totalcomprasporclientemes', totalComprasPorClienteMes);

// 4. Análisis de Ventas por Producto
router.get('/productosmasvendidoscantidad', productosMasVendidosCantidad);
router.get('/productosmasvendidosvalor', productosMasVendidosValor);
router.get('/ventasproductospormes', ventasProductosPorMes);

// 5. Análisis de Ventas por Categoría
router.get('/totalventasporcategoria', totalVentasPorCategoria);
router.get('/ventasporcategoriames', ventasCategoriaPorMes);

// 10. Análisis de Stock
router.get('/productosbajostock', productosBajoStock);
router.get('/stockporcategoria', stockPorCategoria);

// 11. Análisis Combinado de Ventas
router.get('/ventasporclientecategoriames', ventasClienteCategoriaMes);

// 14. Análisis de Clientes Frecuentes
router.get('/clientesfrecuentes', clientesFrecuentes);
router.get('/clientesfrecuentespormes', clientesFrecuentesPorMes);

// 15. Análisis de Productos por Cliente
router.get('/productosmascompradosporcliente', productosPorCliente);
router.get('/categoriasmascompradasporcliente', categoriasPorCliente);

// 16. Análisis de Ventas por Día de la Semana
router.get('/totalventaspordiasemana', totalVentasPorDiaSemana);
router.get('/ventasporcategoriadiasemana', ventasCategoriaPorDiaSemana);

// 17. Análisis de Rotación de Inventario
router.get('/productosmayorrotacion', productosMayorRotacion);
router.get('/categoriasmayorrotacion', categoriasMayorRotacion);

export default router;