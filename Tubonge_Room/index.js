require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middleware/auth');
const socketHandler = require('./sockets/socket');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);

// Protected route (example)
app.get('/api/profile', authenticate, (req, res) => {
  res.send('This is a protected route');
});

// WebSocket handling
socketHandler(server);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
