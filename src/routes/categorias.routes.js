import { Router } from 'express';
import {  obtenerCategorias, obtenerCategoria, registrarCategoria, eliminarCategoria, actualizarCategoria } from '../controllers/categorias.controller.js';

const router = Router();

// Ruta para obtener todos los categorias
router.get('/categorias', obtenerCategorias);

// Ruta para obtener un categoria por su ID
router.get('/categoria/:id', obtenerCategoria);

// Ruta para registrar categoría.
router.post('/registrarcategoria', registrarCategoria);

// Ruta para eliminar una categoria por su ID
router.delete('/eliminarcategoria/:id', eliminarCategoria);

// Ruta para actualizar una categoria por su ID
router.patch('/actualizarcategoria/:id', actualizarCategoria);


export default router;