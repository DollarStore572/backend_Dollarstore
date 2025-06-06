import { pool } from '../db.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Productos');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los productos.',
      error: error
    });
  }
};

// Obtener un producto por su ID
export const obtenerProducto = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Productos WHERE id_producto = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del producto no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del producto.'
    });
  }
};

// Registrar un nuevo producto
export const registrarProducto = async (req, res) => {
  try {
    const { 
      nombre_producto, 
      descripcion, 
      precio_unitario, 
      existencia, 
      id_marca,
      id_categoria, 
      calificacion,
      imagen 
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre_producto || !id_categoria || !precio_unitario || !existencia) {
      return res.status(400).json({
        mensaje: 'Faltan campos requeridos: nombre, categoría, precio o stock.'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO Productos (nombre_producto, descripcion, precio_unitario, existencia, id_marca, id_categoria, calificacion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        nombre_producto,
        descripcion || null, // Puede ser opcional
        precio_unitario, 
        existencia, 
        id_marca,
        id_categoria, 
        calificacion, 
        imagen || null // Puede ser opcional
      ]
    );

    res.status(201).json({ 
      id_producto: result.insertId,
      mensaje: 'Producto registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar el producto.',
      error: error.message
    });
  }
};







export const eliminarProductos = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la producto. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar el producto.',
      error: error
    });
  }
};




// Actualizar una cliente por su ID (parcial o completa)
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Productos SET ? WHERE id_producto = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `el producto con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el producto.',
      error: error,
    });
  }
};
