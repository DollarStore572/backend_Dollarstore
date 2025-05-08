import { Router } from 'express';
import { obtenerComprasConDetalles } from '../controllers/detalles_compras.controller.js';

const router = Router();

// Ruta para obtener todos los ventas
router.get('/obtenerdetallescompras/:id', obtenerComprasConDetalles);


export default router;