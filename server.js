const express = require('express');
const socket = require('socket.io');

const app = express();
const port = 3000;

const server = app.listen(port);

app.use(express.static('public'));

const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection:' + socket.id);

  socket.on('mouse', mouseMessage);

  function mouseMessage(data) {
    socket.broadcast.emit('mouse', data);
    console.log(data);
  }
}