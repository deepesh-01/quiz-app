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


        if(!quiz.participants.includes(userId)){
                // quiz = await Quiz.findByIdAndUpdate({_id:quizId},{$push:{participants:userId}});
                quiz.participants.push(userId);
                await quiz.save();
        }

        if(!user.appeared.includes(score._id)){
            user.appeared.push(score._id);
            await user.save();
        }

        return res.status(200).json({score:score,message:"This API is working"});
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:error.message});
    }
}

exports.getUserScores = async (req,res) => {
    console.log("getUserScores in server called");
    try{
        const userId = req.user._id;
        console.log("userId : ",userId)
        let scores = await Scores.find({userId:userId});
        console.log("scores : ",scores);
        return res.status(200).json({scores:scores,message:"Got all the user scores."});
    }
    catch(err){
        console.log(error);
        return res.status(500).json({message:error.message});
    }
}
    

// 613c5a830a3f7519b40d17e1
// 613c5a830a3f7519b40d17e1