const express = require('express');
const authenticate = require('../middlewares/authenticate');
const Score = require('../controllers/score');

const router = express.Router();

router.post('/submitquiz',authenticate.User, Score.submitQuiz);
router.post('/userscores', authenticate.User, Score.getUserScores);

module.exports = router;