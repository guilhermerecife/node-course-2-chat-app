const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage} = require('./utils/message');


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user conected!');

    socket.emit('newMessage', generateMessage('Admin', 'A new user joined'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined'));

    socket.on('createMessage', (newMessage) => {
        console.log('Creating message', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    });

    socket.on('createEmail', (newEmail) => {
        console.log('Creating email', newEmail);
    });

    socket.on('disconnect', () => {
        console.log('A user was dinconnected from server');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});