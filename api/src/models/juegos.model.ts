import mongoose from 'mongoose';

const juegoSchema = new mongoose.Schema({
  propuesta: {
    type: String,
    required: true
  },
  codigoSala: {
    type: Number,
    required: true
  },
  jugadores: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Juego', juegoSchema);
