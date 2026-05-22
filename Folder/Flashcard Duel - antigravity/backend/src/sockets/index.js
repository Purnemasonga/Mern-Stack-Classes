const { createAdapter } = require('@socket.io/redis-adapter');
const { redisClient } = require('../config/redis');

const registerLobbyHandlers = require('./lobbyHandlers');
const registerGameHandlers = require('./gameHandlers');

module.exports = (io) => {
  if (redisClient.isOpen) {
    const pubClient = redisClient.duplicate();
    const subClient = redisClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
      io.adapter(createAdapter(pubClient, subClient));
      console.log('Socket.io Redis adapter connected');
    });
  }

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register handlers
    registerLobbyHandlers(io, socket);
    registerGameHandlers(io, socket);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      // In a full impl, handle player disconnect from active game or queue
    });
  });
};
