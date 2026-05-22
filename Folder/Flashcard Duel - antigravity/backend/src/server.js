require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

const app = express();
const server = http.createServer(app);

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection, continuing...', err);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception, continuing...', err);
});

// Connect to Database & Redis
connectDB();
connectRedis();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Socket.io initialization
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

require('./sockets')(io);

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/decks', require('./routes/deckRoutes'));
// app.use('/api/matches', require('./routes/matchRoutes'));

app.get('/', (req, res) => {
  res.send('Flashcard Duel API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
