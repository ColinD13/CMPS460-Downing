const express = require('express');
const router = express.Router();

//players
const { getCards } = require('../controllers/cardController');
const { postCard } = require('../controllers/cardController');

router.get('/cards', getCards);
router.post('/cards', postCard);

module.exports = router;