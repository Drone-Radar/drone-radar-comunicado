const mongoose = require('mongoose');
// const Historico = mongoose.model('Historico');
var Historico = require('../models/Historicos');

class HistoricoService {
  constructor() {}

  async createHistorico(historico) {
    return await Historico.create(historico);
  }
}

module.exports = new HistoricoService();
