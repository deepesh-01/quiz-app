const Question = require('../models/question');
const Quiz = require('../models/quiz');

exports.getQuestions = async (req,res) => {
    const questions = await Question.find({ quizId : req.params.quizId});

    const quiz = await Quiz.find({ quizId : req.params.quizId });
    if(!quiz.length){
        return res.status(401).json({message:"This quiz doesn't exist"}); 
    }
    else if(!questions.length){
        return res.status(401).json({message:"Sorry - This quiz is empty"});
    }
    res.status(200).json({questions});
};

exports.postQuestion = async (req,res) => {
    try{
        const newQuestion = new Question(req.body);
        const quizId = req.body.quizId;
        const quiz = await Quiz.findById(quizId);
        if(!quiz) res.status(401).json({message:"This quiz doesn't exist"});
        else{ 
        const newQue = await newQuestion.save();
        console.log("newQuestion : ", newQue);
        const updateQuiz = await Quiz.findByIdAndUpdate(quizId,{$inc : { noOfQue:1 }, $push : {questions:newQue._id} },{new:true});
        console.log("updateQuiz: ", updateQuiz);
        return res.status(200).json({question : newQue});
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

    const question = await Question.findByIdAndUpdate(quesId,{$set : update},{new:true});

    return res.status(200).json({question,message:"Quiz details are updated"});
   }
   catch(error){
    res.status(500).json({message: error.message});
    console.log(error);
   } 
    
};

exports.deleteQuestion = async (req,res) => {
    try{
     const quesId = req.body.id;
 
     const question = await Question.findByIdAndDelete(quesId);
     const quizId = question.quizId;
     const quiz = Quiz.findById(quizId);
     if(!quiz) res.status(401).json({message:"This quiz doesn't exist"});
     const updateQuiz = await Quiz.findByIdAndUpdate(quizId,{$inc : { noOfQue:-1 }, $pull : {questions:question._id} },{new:true});
     console.log("updated quiz : ",updateQuiz);
     console.log("deleted question : ",question);
     return res.status(200).json({question,message:"Successfully deleted the question"});
    }
    catch(error){
     res.status(500).json({message: error.message});
     console.log(error);
    } 
     
 };