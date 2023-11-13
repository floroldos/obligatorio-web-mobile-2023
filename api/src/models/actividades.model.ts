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
    required: true
  },
  puntos: {
    type: Number,
    required: true
  },
  temaId: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Actividad', actividadSchema);
