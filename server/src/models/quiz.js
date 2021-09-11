const mongoose = require('mongoose');
// const User = require('./user');

const QuizSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"Quiz name is required",
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Questions',
    }],
    noOfQue:{
        type:Number,
        default:0,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Users',
    },
},{timestamps:true});

module.exports  = mongoose.model('Quizes',QuizSchema);

