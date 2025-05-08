import { Router } from 'express';
import { actualizarCompra, eliminarCompra, obtenerCompra, obtenerCompraPorId, obtenerCompras, obtenerComprasConDetalles, registrarCompra } from '../controllers/compras.controller.js';

const router = Router();

// Ruta para obtener todos los ventas
router.get('/compras', obtenerComprasConDetalles);

router.get('/compra', obtenerCompra);





export default router;