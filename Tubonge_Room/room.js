const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 5500;
const { Server } = require('socket.io');

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/user.html')
});

io.on('connection', (socket) => {
    console.log(`new user connected`);
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
    })
})

//broadcatsing 
io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
})

server.listen(port, () => {
    console.log(`listning on port ${port}`)
})