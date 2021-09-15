// const quiz = require('../models/quiz');
const mongoose = require('mongoose');
const Quiz = require('../models/quiz');
const Question = require('../models/question');

// @route Post api/quiz/get
// @desc Get all quiz
// @access Public

exports.getAll = async (req,res) => {
    const  quizes = await Quiz.find({}).populate('createdBy');
    res.status(200).json({quizes});
}

exports.getOne = async (req,res) => {
    try{
        const quizId  = req.params.quizId;
        const _id = mongoose.Types.ObjectId(quizId);
        console.log("quizId : ", quizId);
        const quiz = await Quiz.findById({_id}).populate('questions');
        console.log('quiz : ',quiz);
        return res.status(200).json({quiz : quiz});
    }
    catch (error) {
        res.status(500).json({message: error.message});
        console.log(error);
     }
}

// @route Post api/quiz/post
// @desc Post new quiz
// @access Public

exports.newQuiz = (req,res) =>  {
    const newQuiz = new Quiz(req.body);
    console.log("newQuiz : ", newQuiz);
    // console.log(req.body);
    newQuiz.save()
        .then(quiz => res.status(200).json({quiz : quiz}))
        .catch(err => res.status(500).json({message : err.message}));
}

// @route Post api/quiz/put
// @desc update existing quiz
// @access Public

exports.update = async (req,res) => {
    console.log("req.body : ",req.body);
    // console.log("req.body : ",req.body.object);
    try {
        const update = req.body;
        // const id = req.params.id;
        const quizId = req.body.id;
        // console.log("update :",update);
        // console.log("id :",id);
        // console.log("quizid :",quizId);
        // if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});

        const quiz = await Quiz.findByIdAndUpdate(quizId,{$set : update},{new:true});

        return res.status(200).json({quiz,message:"Quiz details are updated"}); 
       }
       catch (error) {
       res.status(500).json({message: error.message});
       console.log(error);
    }
};

exports.deleteQuiz = async (req,res) => {
    try{
        const quizId = req.body.id;
        const quiz = await Quiz.findById(quizId);
        if(!quiz)   return res.status(401).json({message:"This quiz doesn't exist"});
        deletedQuiz = await Quiz.findByIdAndDelete(quizId);
        console.log(deletedQuiz);
        await deletedQuiz.questions.map((question) => {
            deletedQuestion =  Question.findByIdAndDelete(question);
            console.log(deletdQuestion);
        });
        return res.status(200).josn({deleteQuiz,message:"Quiz successfully deleted"});
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
}

