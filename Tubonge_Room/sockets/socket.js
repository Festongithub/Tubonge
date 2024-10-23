const jwt = require('jsonwebtoken');
const Message = require('../models/message');
const User = require('../models/user');

const socketHandler = (server) => {
    const io = require('socket.io')(server);

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = jwt.decoded;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    })
    io.on('connection', (socket) => {
        console.log(`New user connected:`, socket.user.id);

    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        console.log(`User ${socket.user.id} joined room: ${roomId}`);
    });

    socket.on('sendMessage', async ({ roomId, message}) => {
        const user = await User.findById(socket.user.id);
        const newMessage = await Message.create({
            roomId,
            userId: socket.user.id,
            username: user.username,
            message
        });

        io.to(roomId).emit('newMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected:`, socket.user.id);
    });
});
}

module.exports = socketHandler;