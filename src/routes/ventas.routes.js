import { Router } from 'express';
import { obtenerVentasConDetalles, obtenerVentas, eliminarVenta, registrarVenta, actualizarVenta, obtenerVentaPorId } from '../controllers/ventas.controller.js';

const router = Router();

// Ruta para obtener todas las ventas con detalles
router.get('/ventas/detalles', obtenerVentasConDetalles);

// Ruta para obtener todas las ventas
router.get('/ventas', obtenerVentas);

// Ruta para eliminar una venta
router.delete('/ventas/:id_venta', eliminarVenta);

// Ruta para registrar una nueva venta
router.post('/registrarventa', registrarVenta);

// Ruta para actualizar una venta
router.patch('/ventas/:id_venta', actualizarVenta);

// Ruta para obtener una venta por id
router.get('/ventas/:id_venta', obtenerVentaPorId);

export default router;