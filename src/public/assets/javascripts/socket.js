var socket = io();

socket.on('chat message', function(msg){
  $('#messages').append('<div>'+msg+'</div>');
});

$('form').submit(function(event) {
  event.preventDefault();

  var message = $("#message").val();
  $('#message').val('');

  socket.emit('chat message', message);
});
