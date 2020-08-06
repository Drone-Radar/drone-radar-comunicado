const mongoose = require('mongoose');

const HistoricoSchema = new mongoose.Schema({
  droneId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
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
  tracking: {
    type: Boolean,
    required: true,
  },
  createdAtDrone: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('Historico', HistoricoSchema);
