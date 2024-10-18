var socketio =require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

// Assigning Guest Names
function assignGuestName(socket, guestNumber, nickNames, namesUsed){
    var name = 'Guests' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;
}

// Joining Rooms
function joinRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {room: room});
    socket.broadcast.to(room).emit('message',{
        text: nickNames[socket.id] + 'has joined' + room + ','
    });

    var usersInRoom = io.sockets.clients(room);
    if (usersInRoom.length > 1){
        var usersInRoomSummary = 'Users currently in ' + room + '.';
        for ( var index in usersInRoom) {
            var userSocketId = usersInRoom[index].id;
            if(userSocketId !=  socket.id) {
                if (index > 0){
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += '.';
        socket.emit('message', {text: usersInRoomSummary});
    }
}

// Handling name-change requests


// Establishing connection logic

exports.listen = function(server) {
    io = socket.io.listen(server);
    io.set('log level', 1);

    io.sockets.on('connection', function(socket){
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');

        handleMessageBroadCasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);

        socket.on('rooms', function(){
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        handleClientDisconnection(socket, nickNames, namesUsed)
    });
};
