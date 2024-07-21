const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/start', gameController.startGame);
router.post('/guess', gameController.makeGuess);
router.put('/delete', gameController.deleteGuess);

// Add more routes as needed

module.exports = router;
