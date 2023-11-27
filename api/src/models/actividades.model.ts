import mongoose from 'mongoose';

const actividadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: false
  },
  puntos: {
    type: Number,
    required: true
  },
  tema: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Actividad', actividadSchema);
