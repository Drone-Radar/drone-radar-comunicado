const mongoose = require('mongoose')
const Historico = mongoose.model('Historico')

class HistoricoService {
    constructor(){
        
    }
    
    async createHistorico(historico){
        return await Historico.create(historico);
    }
}

module.exports = new HistoricoService()