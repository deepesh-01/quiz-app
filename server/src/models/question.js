const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:"Please enter question",
    },
    option1:{
        type:String,
        required:"Enter 1st option",
    },
    option2:{
        type:String,
        required:"Enter second option",
    },
    option3:{
        type:String,  
    },
    option3:{
        type:String,  
    },
    option4:{
        type:String,  
    },
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quizes'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
    }
});

module.exports = mongoose.model('Questions',QuestionSchema);