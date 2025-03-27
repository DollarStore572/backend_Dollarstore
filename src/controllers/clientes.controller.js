import { pool } from '../db.js';

// Obtener todos los clientes
export const obtenerClientes= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Clientes');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los clientes.',
      error: error
    });
  }
};

// Obtener un cliente por su ID
export const obtenerCliente = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [req.params.id]);
    
    if (result.length <= 0) {
      return res.status(404).json({
        mensaje: `Error al leer los datos. El ID ${req.params.id} del cliente no fue encontrado.`
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos del cliente.'
    });
  }
};


//Insertar un cliente
export const createClientes = async (req, res) => {
  try{
    const {id_cliente, nombre, apellido, telefono, direccion} = req.body;
    const [result] = await pool.query('INSERT INTO Clientes (id_cliente, nombre, apellido, telefono, direccion ) VALUES (?,?,?,?,?)', [id_cliente, nombre, apellido,telefono, direccion]);
    
    if(result.affectedRows <= 0){
      return res.status(500).json({
        message: `Error al guardar datos del cliente.`
      });
    } else {
      console.log(result);
      return res.status(200).json({
        message: `Los datos del cliente con id ${result.insertId} se han guardado exitosamente.`
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Ha ocurrido un error al guardar los datos del cliente.',
      error: error
    });
  }
};



//Actualizar un clientes
export const actualizarClientes = async (req, res) => {
  try{
    //throw new Error('Error al actualizar.');
    const {id_cliente} = req.params;
    const {nombre, apellido, telefono, direccion} = req.body;
  
    const [result] = await pool.query('UPDATE Clientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), telefono = IFNULL(?, telefono), direccion = IFNULL(?, direccion) WHERE id_cliente = ?',
       [nombre, apellido, telefono, direccion, id_cliente]);
  
    if(result.affectedRows === 0){
      return res.status(404).json({
      message: `Error al actualizar. Clientes con id ${id_cliente} no encontrado.`
      });
    }
  
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE id_cliente = ?', [id_cliente])
  
    console.log(result);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Ha ocurrido un error al actualizar los datos del cliente.'
    });
  }
};


