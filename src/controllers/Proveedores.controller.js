import { pool } from '../db.js';

// Obtener todos los clientes
export const obtenerProveedores= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Proveedores');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los proveedores',
      error: error
    });
  }
};

// Obtener un proveedor por su ID
export const obtenerProveedor = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Proveedores WHERE id_proveedor = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del proveedor no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del proveedor.'
    });
  }
};

// Registrar un nuevo proveedor
export const registrarProveedor = async (req, res) => {
  try {
    const { compania, telefono, correo_electronico } = req.body;

    const [result] = await pool.query(
      'INSERT INTO proveedores (compania, telefono, correo_electronico) VALUES (?, ?, ?)',
      [compania, telefono, correo_electronico]
    );

    res.status(201).json({ id_proveedor: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el proveedor.',
      error: error
    });
  }
};

// Eliminar un proveedor por su ID
export const eliminarProveedor = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Proveedores WHERE id_proveedor = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar el proveedor. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el proveedor.',
      error: error
    });
  }
};

// Actualizar un proveedor por su ID (parcial o completa)
export const actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Proveedores SET ? WHERE id_proveedor = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `El proveedor con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el proveedor.',
      error: error,
    });
  }
};