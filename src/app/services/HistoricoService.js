const mongoose = require('mongoose');
// const Historico = mongoose.model('Historico');
var Historico = require('../models/Historicos');

class HistoricoService {
  constructor() {}

  async createHistorico(historico) {
    return await Historico.create(historico);
  }


  async createHistoricoFromDroneList(lstDrones){
    lstDrones.forEach(drone => {
        var historico = {
          droneId: drone._id,
          name: drone.name,
          temperature: drone.temperature,
          humidity: drone.humidity,
          latitude: drone.latitude,
          longitude: drone.longitude,
          tracking: drone.tracking,
          createdAtDrone: drone.createdAt
        }
        Historico.create(historico);
    });
  }

}

module.exports = new HistoricoService();
