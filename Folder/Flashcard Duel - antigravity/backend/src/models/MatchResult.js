const mongoose = require('mongoose');

const matchResultSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
  accuracy: { type: Number, default: 0 }, // percentage
  speedAvg: { type: Number, default: 0 }, // ms
  wrongAnswers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }]
}, { timestamps: true });

const MatchResult = mongoose.model('MatchResult', matchResultSchema);
module.exports = MatchResult;
