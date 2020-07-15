const historicoService = require('./HistoricoService');
const amqp = require('amqplib/callback_api');
require('dotenv/config');

const queue = process.env.CLOUDAMQP_QUEUE;
const exchangeAmqp = process.env.CLOUDAMQP_EXCHANGE;
var amqpConn = null;

class AmqpService {
  constructor() {}

  start() {
    amqp.connect(
      process.env.CLOUDAMQP_URL +
        '?heartbeat=' +
        process.env.CLOUDAMQP_HEARTBEAT,
      function (err, conn) {
        if (err) {
          console.error('[AMQP]', err.message);
          return setTimeout(start, 1000);
        }
        conn.on('error', function (err) {
          if (err.message !== 'Connection closing') {
            console.error('[AMQP] conn error', err.message);
          }
        });
        conn.on('close', function () {
          console.error('[AMQP] reconnecting');
          return setTimeout(start, 1000);
        });
        console.log('[AMQP] connected');
        amqpConn = conn;
        whenConnected();
      }
    );
  }
}

module.exports = new AmqpService();

function whenConnected() {
  startPublisher();
  startWorker();

  setInterval(function () {
    var historico = {
      id: 'drone1',
      temperatura: 10,
      umidade: 40,
      latitude: 10,
      longitude: 10,
    };
    publish('', queue, new Buffer.from(JSON.stringify(historico)));
  }, 1000);
}

// A worker that acks messages only if processed succesfully
function startWorker() {
  amqpConn.createChannel(function (err, ch) {
    if (closeOnErr(err)) return;
    ch.on('error', function (err) {
      console.error('[AMQP] channel error', err.message);
    });

    ch.on('close', function () {
      console.log('[AMQP] channel closed');
    });

    ch.prefetch(10);
    ch.assertQueue(queue, { durable: true }, function (err, _ok) {
      if (closeOnErr(err)) return;
      ch.consume(queue, processMsg, { noAck: false });
      console.log('Worker is started');
    });

    function processMsg(msg) {
      work(msg, async function (ok) {
        try {
          await historicoService.createHistorico(
            JSON.parse(msg.content.toString())
          );
          if (ok) ch.ack(msg);
          else ch.reject(msg, true);
        } catch (e) {
          closeOnErr(e);
        }
      });
    }
  });
}

function work(msg, cb) {
  console.log('Got msg ', msg.content.toString());
  cb(true);
}

function closeOnErr(err) {
  if (!err) return false;
  console.error('[AMQP] error', err);
  amqpConn.close();
  return true;
}

var pubChannel = null;
var offlinePubQueue = [];
function startPublisher() {
  amqpConn.createConfirmChannel(function (err, ch) {
    if (closeOnErr(err)) return;
    ch.on('error', function (err) {
      console.error('[AMQP] channel error', err.message);
    });
    ch.on('close', function () {
      console.log('[AMQP] channel closed');
    });

    pubChannel = ch;
    while (true) {
      var m = offlinePubQueue.shift();
      if (!m) break;
      publish(m[0], m[1], m[2]);
    }
  });
}

function publish(exchange, routingKey, content) {
  try {
    pubChannel.publish(
      exchange,
      routingKey,
      content,
      { persistent: true },
      function (err, ok) {
        if (err) {
          console.error('[AMQP] publish', err);
          offlinePubQueue.push([exchange, routingKey, content]);
          pubChannel.connection.close();
        }
      }
    );
  } catch (e) {
    console.error('[AMQP] publish', e.message);
    offlinePubQueue.push([exchange, routingKey, content]);
  }
}
