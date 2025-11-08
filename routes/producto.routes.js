import { Router } from 'express';
import {
  getAllProductos,
  getProductoById,
  postProducto,
  putProducto,
  deleteProducto,
} from '../controllers/producto.controller.js';
import upload from '../middlewares/multer.js';

const producto = Router();

producto.get('/', getAllProductos);
producto.get('/:id', getProductoById);
producto.post('/', upload.single('imagen'), postProducto);
producto.put('/:id', upload.single('imagen'), putProducto);
producto.delete('/:id', deleteProducto);

export default producto;
