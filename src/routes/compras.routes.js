import { Router } from 'express';
import { obtenerCompra, obtenerComprasConDetalles } from '../controllers/compras.controller.js';

const router = Router();

// Ruta para obtener todos los ventas
router.get('/compras', obtenerComprasConDetalles);

router.get('/compra', obtenerCompra);





export default router;