import Producto from '../models/producto.model.js';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

export const getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.find({}, { __v: 0 });
    if (productos.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron productos' });
    }
    res.status(200).json({ productos });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los productos' });
  }
};

export const getProductoById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.status(200).json({ producto });
  } catch {
    res.status(500).json({ msg: 'Error al obtener el producto' });
  }
};


export const postProducto = async (req, res) => {
  try {
    const imagen = req.file ? `/uploads/${req.file.filename}` : '';

    const { nombre, descripcion, precio } = req.body;

    const producto = new Producto({
      nombre,
      descripcion,
      precio,
      imagen
    });

    await producto.save();
    res.status(201).json({ msg: 'Producto agregado', producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al guardar el producto' });
  }
};


export const putProducto = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const imagen = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
    };
    if (imagen) updateData.imagen = imagen;

    const producto = await Producto.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.status(200).json({ msg: 'Producto actualizado', producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el producto' });
  }
};


export const deleteProducto = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const producto = await Producto.findByIdAndDelete(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    // 🔹 Borrar la imagen si existe
    if (producto.imagen) {
      const rutaImagen = path.join(process.cwd(), 'public', producto.imagen);
      fs.unlink(rutaImagen, (err) => {
        if (err) console.error('Error al eliminar imagen:', err);
      });
    }

    res.status(200).json({ msg: 'Producto eliminado', producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el producto' });
  }
};

