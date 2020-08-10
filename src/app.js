const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');
const amqpService = require('./app/services/AmqpService');
const { validateData } = require('./app/services/HistoricoService');

class AppController {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    require('dotenv/config');

    this.database();
    requireDir('./app/models');

    amqpService.start();

    setInterval(validateData, 60000);

    return app;
  }

  database() {
    mongoose.connect(process.env.MONGODB_CONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

module.exports = new AppController();
