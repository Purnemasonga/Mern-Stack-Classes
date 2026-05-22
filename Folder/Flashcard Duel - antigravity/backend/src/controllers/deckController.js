const Deck = require('../models/Deck');
const Flashcard = require('../models/Flashcard');

// @desc    Create a new deck
// @route   POST /api/decks
// @access  Private
const createDeck = async (req, res, next) => {
  try {
    const { title, description, category, isPublic } = req.body;
    
    const deck = await Deck.create({
      title,
      description,
      category,
      isPublic,
      creator: req.user._id
    });

    res.status(201).json(deck);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all public decks
// @route   GET /api/decks
// @access  Public
const getPublicDecks = async (req, res, next) => {
  try {
    const decks = await Deck.find({ isPublic: true }).populate('creator', 'username avatar');
    res.json(decks);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's decks
// @route   GET /api/decks/mydecks
// @access  Private
const getMyDecks = async (req, res, next) => {
  try {
    const decks = await Deck.find({ creator: req.user._id });
    res.json(decks);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a deck by id (along with its flashcards)
// @route   GET /api/decks/:id
// @access  Public/Private
const getDeckById = async (req, res, next) => {
  try {
    const deck = await Deck.findById(req.params.id).populate('creator', 'username');
    if (!deck) {
      res.status(404);
      throw new Error('Deck not found');
    }

    if (!deck.isPublic && deck.creator._id.toString() !== req.user?._id?.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this deck');
    }

    const flashcards = await Flashcard.find({ deck: deck._id });
    res.json({ deck, flashcards });
  } catch (error) {
    next(error);
  }
};

module.exports = { createDeck, getPublicDecks, getMyDecks, getDeckById };
