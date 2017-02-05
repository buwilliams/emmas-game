var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Server static files
app.use(express.static('src/public'));

// 404
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
})

// Handle server errors
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// Start server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
