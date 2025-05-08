import { Router } from 'express';
import {  obtenerMarcas, obtenerMarca, registrarMarca, eliminarMarca, actualizarMarca } from '../controllers/marcas.controller.js';

const router = Router();

// Ruta para obtener todas las marcas
router.get('/marcas', obtenerMarcas);

// Ruta para obtener una marca por su ID
router.get('/marca/:id', obtenerMarca);

// Ruta para registrar marca.
router.post('/registrarmarca', registrarMarca);

// Ruta para eliminar una marca por su ID
router.delete('/eliminarmarca/:id', eliminarMarca);

// Ruta para actualizar una marca por su ID
router.patch('/actualizarmarca/:id', actualizarMarca);

export default router;