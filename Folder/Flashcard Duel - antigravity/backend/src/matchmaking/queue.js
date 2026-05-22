const { redisClient } = require('../config/redis');

// Basic Redis matchmaking queue implementation
class MatchmakingQueue {
  constructor() {
    this.queueKeyPrefix = 'matchmaking_queue:'; // e.g. matchmaking_queue:deckId
  }

  async joinQueue(userId, deckId, socketId) {
    const key = `${this.queueKeyPrefix}${deckId}`;
    
    // Add player to the end of the list
    const playerStr = JSON.stringify({ userId, socketId, joinedAt: Date.now() });
    await redisClient.rPush(key, playerStr);
    
    // Try to find a match immediately
    return await this.tryMatch(deckId);
  }

  async tryMatch(deckId) {
    const key = `${this.queueKeyPrefix}${deckId}`;
    
    // If there are 2 or more players, pop the first two
    const queueLength = await redisClient.lLen(key);
    
    if (queueLength >= 2) {
      // For simplicity in concurrent environments, using a transaction would be better,
      // but LPOP with count of 2 is atomic in Redis 6.2+
      const playersStr = await redisClient.lPopCount(key, 2);
      
      if (playersStr && playersStr.length === 2) {
        return {
          matchFound: true,
          players: playersStr.map(p => JSON.parse(p))
        };
      }
    }
    
    return { matchFound: false };
  }

  async leaveQueue(userId, deckId) {
    const key = `${this.queueKeyPrefix}${deckId}`;
    const playersStr = await redisClient.lRange(key, 0, -1);
    
    // Inefficient for very large queues, but typical matchmaking queues per deck are small
    for (const playerStr of playersStr) {
      const player = JSON.parse(playerStr);
      if (player.userId === userId) {
        await redisClient.lRem(key, 1, playerStr);
        return true;
      }
    }
    return false;
  }
}

module.exports = new MatchmakingQueue();
