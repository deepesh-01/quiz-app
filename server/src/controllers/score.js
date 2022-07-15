const mongoose = require('mongoose');
const Quiz = require('../models/quiz');
const Scores = require('../models/scores');
const User = require('../models/user');

// @route Post api/score/submit
// @desc Get all quiz
// @access Public

exports.submitQuiz = async (req,res) => {
    try{
        const quizId = req.body.quizId;
        const userId = req.user._id;
        const answers = req.body.answers;
        let ans = [];
        let scr=0;
        let quiz = await Quiz.findById(quizId).populate('questions');
        let user = await User.findById(userId);
        for(ques in quiz.questions){
            ans.push(quiz.questions[ques].correctOption);
        }
        let qCorrect = [];
        let qAttempted = [];

        for(a in answers){
            let id = parseInt(answers[a].id);
            if(ans[id-1]===answers[a].answer){
                qCorrect.push(id);
                scr++;
            }
            qAttempted.push(id);
        }

        console.log("Score is : ",scr);

        const scoreObj = {
            quizId : quizId,
            userId : userId,
            questionsAttempted : qAttempted,
            correctAnswers : qCorrect,
            score : scr,
        }

        const newScore = new Scores(scoreObj);
        const nScore = await newScore.save();

        const uid = user._id;
        const qid = quiz._id;

        if(!quiz.participants.includes(userId)){
            quiz = await Quiz.findByIdAndUpdate(quizId,{$push:{participants:userId}});
        }

        if(!user.appeared.includes(quizId)){
            user = await User.findByIdAndUpdate(userId,{$push:{appeared:quizId}});
        }
        return res.status(200).json({score:scr,message:"This API is working"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:error.message});
    }
}
    