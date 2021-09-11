const express = require('express');
const Quiz = require('../controllers/quiz');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', Quiz.getAll, (req,res)=>{
    res.send(200).json({message:"Route is working"});
});

router.post('/newquiz', authenticate.UserAdmin , Quiz.newQuiz);

router.put('/updatequiz', Quiz.update);

module.exports = router;





