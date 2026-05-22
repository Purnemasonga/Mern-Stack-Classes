const { redisClient } = require('../config/redis');
const Match = require('../models/Match');
const Flashcard = require('../models/Flashcard');

class GameRoom {
  constructor(roomCode) {
    this.roomCode = roomCode;
  }

  async init(deckId, players) {
    // Save state to Redis
    const state = {
      deckId,
      players: players.map(p => ({
        userId: p.userId,
        socketId: p.socketId,
        score: 0,
        isReady: false,
        connected: true
      })),
      status: 'waiting', // waiting, active, completed
      currentQuestionIndex: 0,
      startTime: null
    };

    await redisClient.set(`game:${this.roomCode}`, JSON.stringify(state));
    await redisClient.expire(`game:${this.roomCode}`, 3600); // 1 hour expiry
    return state;
  }

  async getState() {
    const stateStr = await redisClient.get(`game:${this.roomCode}`);
    return stateStr ? JSON.parse(stateStr) : null;
  }

  async setState(state) {
    await redisClient.set(`game:${this.roomCode}`, JSON.stringify(state));
  }

  async setPlayerReady(userId) {
    const state = await this.getState();
    if (!state) return null;

    const player = state.players.find(p => p.userId === userId);
    if (player) player.isReady = true;

    await this.setState(state);
    return state;
  }

  async allReady() {
    const state = await this.getState();
    return state && state.players.every(p => p.isReady);
  }

  async updateScore(userId, points) {
    const state = await this.getState();
    if (!state) return null;

    const player = state.players.find(p => p.userId === userId);
    if (player) player.score += points;

    await this.setState(state);
    return state;
  }
}

module.exports = GameRoom;
