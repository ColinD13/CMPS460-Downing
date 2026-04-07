const express = require('express');
const router = express.Router();

//players
const { getCards } = require('../controllers/cardController');
const { postCard } = require('../controllers/cardController');
const { getCommanders } = require('../controllers/cardController');
const { postCommander } = require('../controllers/cardController'); 

router.get('/cards', getCards);
router.post('/cards', postCard);
router.get('/commanders', getCommanders);
router.post('/commanders', postCommander);

module.exports = router;