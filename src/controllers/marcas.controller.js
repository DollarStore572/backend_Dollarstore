import { pool } from '../db.js';

// Obtener todas las marcas
export const obtenerMarcas= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Marcas');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de las marcas.',
      error: error
    });
  }
};

// Obtener un cliente por su ID
export const obtenerMarca = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Marcas WHERE id_marca = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} de la categoria no fue encontrada.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de la marca.'
    });
  }
};

// Registrar una nueva marca
export const registrarMarca = async (req, res) => {
    try {
      const { nombre_marca } = req.body;
  
      const [result] = await pool.query(
        'INSERT INTO marcas (nombre_marca) VALUES (?)',
        [nombre_marca]
      );
  
      res.status(201).json({ id_categoria: result.insertId });
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ha ocurrido un error al registrar la marca.',
        error: error
      });
    }
  };
  
  // Eliminar una marca por su ID
export const eliminarMarca = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Marcas WHERE id_marca = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `Error al eliminar la marca. El ID ${req.params.id} no fue encontrado.`
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al eliminar la marca.',
      error: error
    });
  }
};

// Actualizar una marca por su ID (parcial o completa)
export const actualizarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;

    const [resultado] = await pool.query(
      'UPDATE Marcas SET ? WHERE id_marca = ?',
      [datos, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: `La marca con ID ${id} no existe.`,
      });
    }

    res.status(204).send(); // Respuesta sin contenido para indicar éxito
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar la marca.',
      error: error,
    });
  }
};