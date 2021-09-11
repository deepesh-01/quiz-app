const express = require('express');
const Question = require('../controllers/question');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/:quizId', Question.getQuestions );

router.post('/new', authenticate.UserAdmin, Question.postQuestion);

router.put('/update', authenticate.UserAdmin, Question.updateQuestion);

router.delete('/delete', authenticate.UserAdmin, Question.deleteQuestion );


module.exports = router;