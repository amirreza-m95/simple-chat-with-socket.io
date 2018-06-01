var express = require('express');
var app = express();
var server = require('http').Server(app);//server function is capitla S
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static('../app'));

io.on('connection',function(socket){
  socket.emit('new-user');
  socket.on("new-msg",function(data){
    io.sockets.emit('messages',data)

  });

});

server.listen(8080);
