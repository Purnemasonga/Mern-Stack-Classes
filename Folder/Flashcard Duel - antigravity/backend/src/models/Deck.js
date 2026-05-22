const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: 'General' },
  isPublic: { type: Boolean, default: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardCount: { type: Number, default: 0 }
}, { timestamps: true });

// Index for better searching of public decks
deckSchema.index({ title: 'text', category: 'text' });

const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;
