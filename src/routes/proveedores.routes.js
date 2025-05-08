import { Router } from 'express';
import {  obtenerProveedores, obtenerProveedor, registrarProveedor, eliminarProveedor, actualizarProveedor } from '../controllers/proveedores.controller.js';

const router = Router();

// Ruta para obtener todos los proveedores
router.get('/proveedores', obtenerProveedores);

// Ruta para obtener un cliente por su ID
router.get('/proveedor/:id', obtenerProveedor);

//Ruta para registrar nuevo proveedor
router.post('/registrarproveedor', registrarProveedor);

// Ruta para eliminar un proveedor por su ID
router.delete('/eliminarproveedor/:id', eliminarProveedor);

// Ruta para actualizar un proveedor por su ID
router.patch('/actualizarproveedor/:id', actualizarProveedor);

export default router;