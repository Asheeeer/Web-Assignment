// Input some modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// create Express application
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Specifies the static file directory
app.use(express.static(__dirname));

let clientCount = 0;
let users = [];

// Route processing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.IO processing and show who enter the room
io.on('connection', (socket) => {
  clientCount++;
  socket.nickname = 'user' + clientCount
  io.emit('enter', socket.nickname + ' enters the room.')
  console.log('A user connected');

  // Listens for messages sent by the client
  socket.on('chat message', (msg) => {
    console.log(socket.nickname + ': ' + msg);

    // Broadcast the message to all connected clients
    io.emit('chat message', socket.nickname + ': ' + msg);
  });

  socket.on('typing', function(){
    // Broadcast the message when some users is typing
    socket.broadcast.emit('typing', socket.nickname+ '  is typing');
  });


  // Listen for client disconnection events
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    io.emit('leave', socket.nickname + ' leaves the room.');
    const index = users.indexOf(socket.nickname);
    if (index > -1){
      users.splice(index, 1);
    }
    io.emit('userList',users);
    //delete users who leave 
  });

  //add a new user into the current user listen
  users.push(socket.nickname);
  io.emit('userList',users);
});
  
// active the server
const port = 3000;
server.listen(port, () => {
  console.log('Server listening on port ' + port);
});
