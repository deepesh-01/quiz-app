const express = require('express');
const Quiz = require('../controllers/quiz');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', Quiz.getAll);

router.get('/:quizId', Quiz.getOne);

router.post('/newquiz', authenticate.UserAdmin , Quiz.newQuiz);

router.put('/updatequiz', authenticate.UserAdmin , Quiz.update);



module.exports = router;





