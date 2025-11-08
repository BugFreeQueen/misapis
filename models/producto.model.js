import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
  },
  imagen: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
  },
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;
