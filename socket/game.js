const c = require('../config');

const handleSockets = function(io) {
  io.on('connection', function(socket) {

    if (c.settings.connectLog) {
      console.log(`🔑 ${socket.id} connected!`);
    };

    socket.on('join', function(room) {
      socket.join(room);
    });

    socket.on('disconnect', function() {
      if (c.settings.disconnectLog) {
        console.log(`😲 ${socket.id} disconnected.`);
      }
    });

  });
}

module.exports = handleSockets;