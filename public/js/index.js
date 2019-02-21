var socket = io();

socket.on('connect', function() {
    console.log('Connected to server!');

    socket.emit('createMessage', {
        from: "Guilherme",
        text: "Nice to meet you"
    });
});

socket.on('disconnect', function() {
    console.log('Disconected from server');
});

socket.on('newEmail', function(email) {
    console.log('New email!', email);
});

socket.on('newMessage', function(message) {
    console.log('New message!', message);
});