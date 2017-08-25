const express = require('express');
const c = require('./config');

const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

require('./socket/game')(io); //game sockets

const port = c.app.port;

http.listen(port, function(error) {
  console.log(`🚅 Socket server running at http://localhost:${port}`);
});