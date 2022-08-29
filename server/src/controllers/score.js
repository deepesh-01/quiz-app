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

        //get user and quiz from database
        let quiz = await Quiz.findById(quizId).populate('questions');
        let user = await User.findById(userId);

        //check quiz and user
        if(!quiz) res.status(401).json({message:"This quiz doesn't exist"});
        if(!user) res.status(401).json({message:"User doesn't exist"});

        const answers = req.body.answers;
        let ans = [];

        //get answers
        for(ques in quiz.questions){
            ans.push(quiz.questions[ques].correctOption);
        }

        let qCorrect = [];
        let qAttempted = [];

        //check for answers
        for(a in answers){
            let id = parseInt(answers[a].id);
            if(ans[id-1]===answers[a].answer){
                qCorrect.push(id);
            }
            qAttempted.push(id);
        }

        const scoreObj = {
            quizId : quizId,
            userId : userId,
            questionsAttempted : qAttempted,
            correctAnswers : qCorrect,
        }

        console.log("Score before saving : ",scoreObj);

        const prevData = await Scores.findOne({userId:userId,quizId:quizId});
        console.log("prevData : ",prevData);

        let score = null;

        if(!prevData){
            const newScore = new Scores(scoreObj);
            score = await newScore.save();
        }
        else{
            console.log("score to update : ",score);
            score = await Scores.findByIdAndUpdate(prevData._id,{$set : scoreObj},{new:true});
        }

        console.log("prevData : ",prevData);
        console.log("score : ",score);


        if(!quiz.participants.includes(userId)){
            quiz = await Quiz.findByIdAndUpdate(quizId,{$push:{participants:userId}});
        }

        if(!user.appeared.includes(quizId)){
            user = await User.findByIdAndUpdate(userId,{$push:{appeared:quizId}});
        }
        console.log("score after saving : ",score);
        return res.status(200).json({score:score,message:"This API is working"});
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:error.message});
    }
}
    