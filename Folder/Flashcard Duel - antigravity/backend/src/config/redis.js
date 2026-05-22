const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('Redis connected');
    }
  } catch (err) {
    console.error('Redis connection failed, continuing without Redis:', err.message);
  }
};

module.exports = { redisClient, connectRedis };
