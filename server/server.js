const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user conected!');

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hey, what is going on?',
        createdAt: 123
    });

    socket.on('createMessage', (newMessage) => {
        console.log('Creating message', newMessage);
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