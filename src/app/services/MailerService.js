const nodemailer = require('nodemailer');
require('dotenv/config');

class MailerService {
    constructor() {}
    
    start(filteredResult) {

        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER_MAILER,
                pass: process.env.PASSWORD_MAILER,
            }
        });

        var $user = 'Drones';
        var $destinatario = 'aluno@fiap.com.br';

        var mailOptions = {
            from: $user,
            to: $destinatario,
            subject: '[Resultado] - Validação de Dados',
            text: 'Resultados Validados: ' + '\n' + JSON.stringify(filteredResult) 
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    }
}

module.exports = new MailerService();