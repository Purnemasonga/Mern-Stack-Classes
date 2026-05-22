const express = require('express');
const router = express.Router();
const { createDeck, getPublicDecks, getMyDecks, getDeckById } = require('../controllers/deckController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(getPublicDecks).post(protect, createDeck);
router.route('/mydecks').get(protect, getMyDecks);
router.route('/:id').get(getDeckById);

module.exports = router;
