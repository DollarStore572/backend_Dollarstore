import { Router } from 'express';
import { obtenerClientes, obtenerCliente, createClientes, actualizarClientes } from '../controllers/clientes.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get('/clientes/:id', obtenerCliente);

router.post('/clientes', createClientes);

router.patch('/clientes/:id', actualizarClientes);

export default router;