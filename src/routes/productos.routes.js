import { Router } from 'express';
import {  actualizarProducto, eliminarProductos, obtenerProducto, obtenerProductos, registrarProducto } from '../controllers/productos.controller.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/productos', obtenerProductos);

router.get('/producto/:id', obtenerProducto);

router.post('/registrarproductos', registrarProducto);

router.delete('/eliminarproductos/:id', eliminarProductos);

router.patch('/actualizarproductos/:id', actualizarProducto);



export default router;