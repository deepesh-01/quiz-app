const mongoose = require('mongoose');

const Question = require('../models/question');
const Quiz = require('../models/quiz');


exports.getQuestions = async (req,res) => {
    // const questions = await Question.find({});
    try{
        const _id = mongoose.Types.ObjectId(req.params.quizId);
        console.log("quiz id is : ",_id);
        const quiz = await Quiz.findById({_id}).populate('questions');
        // console.log("quiz is : ",quiz);
        if(!quiz){
            return res.status(401).json({message:"This quiz doesn't exist"}); 
        }
        else if(!quiz.questions){
            return res.status(401).json({message:"Sorry - This quiz is empty"});
        }
        return res.status(200).json({question : quiz.questions});
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log(error);
    }
};

exports.getOne = async (req,res) => {
    try{
        const questionId = req.params.questionId;
        const _id = mongoose.Types.ObjectId(questionId);
        // console.log("id is : ",_id);
        const question = await Question.findById(_id);
        // console.log("question is : ", question);
        if(!question) return res.status(401).json({message:"This question doesn't exist"});
        return res.status(200).json({"question":question});
        }
    catch(error){
        res.status(500).json({message: error.message});
        console.log(error);
    }
}

exports.postQuestion = async (req,res) => {
    try{
        const newQuestion = new Question(req.body);
        const quizId = req.body.quizId;
        const quiz = await Quiz.findById(quizId);
        if(!quiz) res.status(401).json({message:"This quiz doesn't exist"});
        else{ 
        const newQue = await newQuestion.save();
        console.log("newQuestion : ", newQue);
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId,{$inc : { noOfQue:1 }, $push : {questions:newQue._id} },{new:true}).populate('questions');
        console.log("updateQuiz: ", updatedQuiz);
        // return res.status(200).json({question : newQue});
        return res.status(200).json({quiz : updatedQuiz});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log(error);
    }
    
        
};

exports.updateQuestion = async (req,res) => {
   try{
    const update = req.body;
    const quesId = req.body.id;
    console.log(quesId);
    const question = await Question.findByIdAndUpdate(quesId,{$set : update},{new:true});
    if(!question) return res.status(401).json({message:"Please enter valid id"});
    return res.status(200).json({question,message:"Quiz details are updated"});
   }
   catch(error){
    console.log(error);
    res.status(500).json({message: error.message});
   } 
    
};

exports.deleteQuestion = async (req,res) => {
    console.log("reqbody is : ",req.body);
    try{
     const quesId = req.body.id;
     const question = await Question.findByIdAndDelete(quesId);
     const quizId = question.quizId;
     const quiz = Quiz.findById(quizId);
     if(!quiz) res.status(401).json({message:"This quiz doesn't exist"});
     const updateQuiz = await Quiz.findByIdAndUpdate(quizId,{$inc : { noOfQue:-1 }, $pull : {questions:question._id} },{new:true}).populate('questions');
     console.log("updated quiz : ",updateQuiz);
     console.log("deleted question : ",question);
     return res.status(200).json({quiz: updateQuiz,message:"Successfully deleted the question"});
    }
    catch(error){
     res.status(500).json({message: error.message});
     console.log(error);
    } 
     
 };