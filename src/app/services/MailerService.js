const nodemailer = require('nodemailer');
require('dotenv/config');

class MailerService {
  constructor() {}

  start(filteredResult) {
    var transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASSWORD_MAILER,
      },
    });

    var $user = 'Drones';
    var $destinatario = process.env.DESTINATARIO;

    var iterateData = function(data) {
      var text = 'Drone: ' + data[0].name + '\n';

      for (var key in data) {
        text += 'Longitude: ' + data[key].longitude + ' | ' + 
        'Latitude: ' + data[key].latitude + ' | ' + 
        'Temperatura: ' + data[key].temperature + ' | ' + 
        'Umidade: ' + data[key].humidity + ' | ' + 
        'Criado em: ' + new Date(data[key].createdAt).toISOString() + '\n'; 
      }

      return text;
    };

    var mailOptions = {
      from: $user,
      to: $destinatario,
      subject: '[Resultado] - Validação de Dados',
      text: iterateData(filteredResult),
    };

    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  }
}

module.exports = new MailerService();
