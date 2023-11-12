import mongoose from 'mongoose';

const temaSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: true
  },
  descripccion:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Tema', temaSchema);
