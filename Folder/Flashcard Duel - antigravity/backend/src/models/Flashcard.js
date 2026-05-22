const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  deck: { type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  distractors: [{ type: String }] // Optional: auto-generated or manually added wrong answers
}, { timestamps: true });

const Flashcard = mongoose.model('Flashcard', flashcardSchema);
module.exports = Flashcard;
