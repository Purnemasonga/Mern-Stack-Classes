const matchmakingQueue = require('../matchmaking/queue');
const GameRoom = require('../game-engine/GameRoom');
const crypto = require('crypto');

const generateRoomCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

module.exports = (io, socket) => {
  // Event: Join Quick Play
  socket.on('join_quick_play', async ({ userId, deckId }) => {
    try {
      const result = await matchmakingQueue.joinQueue(userId, deckId, socket.id);
      
      if (result.matchFound) {
        // Create match room
        const roomCode = generateRoomCode();
        const room = new GameRoom(roomCode);
        await room.init(deckId, result.players);

        // Add both sockets to the socket.io room
        const player1Socket = io.sockets.sockets.get(result.players[0].socketId);
        const player2Socket = io.sockets.sockets.get(result.players[1].socketId);

        if (player1Socket) player1Socket.join(roomCode);
        if (player2Socket) player2Socket.join(roomCode);

        // Notify players match is found
        io.to(roomCode).emit('match_found', { roomCode, deckId });
      } else {
        // Still waiting
        socket.emit('waiting_in_queue');
      }
    } catch (err) {
      console.error(err);
      socket.emit('error', 'Matchmaking failed');
    }
  });

  // Event: Leave Quick Play
  socket.on('leave_quick_play', async ({ userId, deckId }) => {
    await matchmakingQueue.leaveQueue(userId, deckId);
  });

  // Event: Host Private Room
  socket.on('host_private_room', async ({ userId, deckId }) => {
    const roomCode = generateRoomCode();
    socket.join(roomCode);
    
    // Store preliminary state
    const room = new GameRoom(roomCode);
    await room.init(deckId, [{ userId, socketId: socket.id }]);

    socket.emit('room_created', { roomCode });
  });

  // Event: Join Private Room
  socket.on('join_private_room', async ({ userId, roomCode }) => {
    const room = new GameRoom(roomCode);
    const state = await room.getState();

    if (!state) {
      return socket.emit('error', 'Room not found');
    }

    if (state.players.length >= 2) {
      return socket.emit('error', 'Room is full');
    }

    state.players.push({ userId, socketId: socket.id, score: 0, isReady: false, connected: true });
    await room.setState(state);
    
    socket.join(roomCode);
    io.to(roomCode).emit('player_joined', { state });
  });
};
