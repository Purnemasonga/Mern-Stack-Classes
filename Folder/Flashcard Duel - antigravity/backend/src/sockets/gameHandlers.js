const GameRoom = require('../game-engine/GameRoom');
const Flashcard = require('../models/Flashcard');
const Match = require('../models/Match');

module.exports = (io, socket) => {
  // Event: Player Ready
  socket.on('player_ready', async ({ roomCode, userId }) => {
    const room = new GameRoom(roomCode);
    const state = await room.setPlayerReady(userId);

    if (state) {
      io.to(roomCode).emit('player_ready_state', { players: state.players });

      const allReady = await room.allReady();
      if (allReady && state.status === 'waiting') {
        state.status = 'active';
        state.startTime = Date.now();
        await room.setState(state);

        // Fetch questions and start game
        const flashcards = await Flashcard.find({ deck: state.deckId });
        // Simplified: Start round 1
        io.to(roomCode).emit('game_starting', { countdown: 3 });
        
        setTimeout(() => {
          io.to(roomCode).emit('next_question', {
            questionIndex: 0,
            totalQuestions: flashcards.length,
            card: flashcards[0] // Need to exclude answer for real impl
          });
        }, 3000);
      }
    }
  });

  // Event: Submit Answer
  socket.on('submit_answer', async ({ roomCode, userId, isCorrect, timeTaken }) => {
    const room = new GameRoom(roomCode);
    
    // Simple score logic: correct answer = 100 base + speed bonus
    if (isCorrect) {
      const speedBonus = Math.max(0, 100 - Math.floor(timeTaken / 100)); // arbitrary speed logic
      const points = 100 + speedBonus;
      
      const state = await room.updateScore(userId, points);
      io.to(roomCode).emit('score_updated', { players: state.players });
    }
    
    // In a full implementation, we'd check if both players answered before moving to the next question
  });
};
