import { getProductos } from '../models/productos.model.js'
import pool from '../config/db.js';

export const productos= async (req ,res) => {
    try {
        const result = await getProductos()
        res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const subirProducto = async (req, res) => {
  try {
    
    console.log('subirproducto: ',req.body)
    console.log('archivo: ',req.file)
    const { nombre, precio, descripcion, categoria_id, seller_id } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Imagen no subida' });
    }

    const imagen = `/uploads/${req.file.filename}`;

    if (!nombre || !descripcion || !precio || !categoria_id || !seller_id) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const result = await pool.query(
      `INSERT INTO products (name, description, price, imagen, category_id, seller_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nombre, descripcion, precio, imagen, categoria_id, seller_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al subir producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

