const c = require('../config');

var numbers = [];
var rooms = [];

const handleSockets = function(io) {
  io.on('connection', function(socket) {
    
    socket.join(socket.id);

    if (c.settings.connectLog) {
      console.log(`🔑 ${socket.id} connected!`);
    };
    
    function joinManage(room){
      rooms.push({id: socket.id, room: room});
      socket.join(room);
    }
    
    function leave(){
      for(var i = 0; i < rooms.length; i++){
        if(rooms[i].id === socket.id){
          rooms.splice(i, 1);
        }
      }
    }

    socket.on('join', function(room) {
      socket.join(room);
    });
    
    socket.on('tryNewGameCode', function(number){
      if(numbers.indexOf(number) > -1){
        socket.emit('newGameCodeResponse', false);
      }
      else{
        numbers.push(number);
        joinManage(number);
        socket.emit('newGameCodeResponse', true);
      }
    })
    
    socket.on('group', function(resp){
      io.sockets.in(resp.room).emit(resp.action, resp.data || null);
    })
    
    socket.on('direct', function(resp){
      io.sockets.in(resp.id).emit(resp.action, resp.data || null);
    })
    
    socket.on('disconnecting', function(){
      leave();
    })

    socket.on('disconnect', function() {
      if (c.settings.disconnectLog) {
        console.log(`😲 ${socket.id} disconnected.`);
      }
    });

  });
}

module.exports = handleSockets;