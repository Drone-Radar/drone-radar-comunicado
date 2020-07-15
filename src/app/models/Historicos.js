const mongoose = require('mongoose');

const HistoricoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  temperatura: {
    type: Number,
    required: true,
  },
  umidade: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Historico', HistoricoSchema);
