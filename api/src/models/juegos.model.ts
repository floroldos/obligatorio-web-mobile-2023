import mongoose from 'mongoose';

const juegoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  codigo: {
    type: Number,
    required: true
  },
  estaJugando: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Juego', juegoSchema);
