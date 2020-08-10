const mongoose = require('mongoose');
var Historico = require('../models/Historicos');
var mailerService = require('../services/MailerService');

class HistoricoService {
	constructor() {}

	async createHistorico(historico) {
		return await Historico.create(historico);
	}

	async createHistoricoFromDroneList(lstDrones) {
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

	async validateData() {
		var model = mongoose.model('Historico', Historico.HistoricoSchema);
		var now = new Date(Date.now());
		var lastMinute = new Date(Date.now() - 1 * 60 * 1000);


		model.find({
			createdAt: {
				'$gte': lastMinute,
				'$lte': now
			}
		}, 'name temperature humidity createdAt', function (err, result) {

			if (err) {
				return handleError(err);
			}

			if (result == "" || result == null) {
				return;
			}

			var filteredResult = result.filter((currentElement, index, docs) => {

				if (docs[index].temperature > 35 || docs[index].temperature < 0 || docs[index].humidity < 15) {
					return currentElement;
				}
			})

			return mailerService.start(filteredResult);
		});
	}
}

module.exports = new HistoricoService();