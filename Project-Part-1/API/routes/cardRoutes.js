const express = require('express');
const router = express.Router();

//players
const { getCards } = require('../controllers/cardController');
const { postCard } = require('../controllers/cardController');
const { getCommanders } = require('../controllers/cardController');
const { postCommander } = require('../controllers/cardController'); 
const { postSeenCard } = require('../controllers/cardController');
const { getSeenCard } = require('../controllers/cardController');

router.get('/cards', getCards);
router.post('/cards', postCard);
router.get('/commanders', getCommanders);
router.post('/commanders', postCommander);
router.get('/seenCard', getSeenCard);
router.post('/seenCard', postSeenCard);

module.exports = router;