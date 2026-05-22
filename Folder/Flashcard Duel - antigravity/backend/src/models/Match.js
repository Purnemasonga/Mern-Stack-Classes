const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  deck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true },
  status: { type: String, enum: ['waiting', 'active', 'completed', 'abandoned'], default: 'waiting' },
  roomCode: { type: String, required: true, unique: true },
  startTime: { type: Date },
  endTime: { type: Date },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
