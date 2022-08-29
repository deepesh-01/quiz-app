const mongoose = require('mongoose');

const ScoresSchema = new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quizes'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },
    questionsAttempted:[{
        type:Number,
        default:0,
    }],
    correctAnswers:[{
        type:Number,
        default:0,
    }],
},{timestamps:true});

module.exports = mongoose.model('Scores',ScoresSchema);