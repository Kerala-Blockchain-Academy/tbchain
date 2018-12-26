'use strict'

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const { Stream } = require('sawtooth-sdk/messaging/stream');

const { handleEvent, setSocket } = require('./eventHandler');
const subscribe = require('./subscriber');

const VALIDATOR_URL = "tcp://validator:4004"
const stream = new Stream(VALIDATOR_URL)

/*--------------------------------*/

// Start stream and send delta event subscription request
const start = (socket) => {
  setSocket(socket);
  
  //return new Promise(resolve => {
    stream.connect(() => {
      // Register handler event
      stream.onReceive(handleEvent);
      // Make event subscriptions
      subscribe(stream);
    })
  //})
}

/*----------------------------------------*/

io.on('connection', function(socket){
  start(socket);
});

server.listen(3000);
