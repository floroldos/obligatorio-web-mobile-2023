import mongoose from 'mongoose';

const juegoSchema = new mongoose.Schema({
  propuesta: {
    type: String,
    required: true
  },
  codigo: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Juego', juegoSchema);
