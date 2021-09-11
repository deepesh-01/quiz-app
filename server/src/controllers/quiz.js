// const quiz = require('../models/quiz');
const Quiz = require('../models/quiz');

// @route Post api/quiz/get
// @desc Get all quiz
// @access Public

exports.getAll = async (req,res) => {
    const  quizes = await Quiz.find({});
    res.status(200).json({quizes});
}

// @route Post api/quiz/post
// @desc Post new quiz
// @access Public

exports.newQuiz = (req,res) =>  {
    const newQuiz = new Quiz(req.body);
    console.log("newQuiz : ", newQuiz);
    console.log(req.body);
    newQuiz.save()
        .then(quiz => res.status(200).json({quiz : quiz}))
        .catch(err => res.status(500).json({message : err.message}));
}

// @route Post api/quiz/put
// @desc update existing quiz
// @access Public

exports.update = async (req,res) => {
    try {
        const update = req.body;
        // const id = req.params.id;
        const quizId = req.body.id;
        console.log("update :",update);
        // console.log("id :",id);
        console.log("quizid :",quizId);
        // if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."});

        const user = await User.findByIdAndUpdate(quizId,{$set : update},{new:true});

        return res.status(200).json({user,message:"Quiz details are updated"}); 
       }
       catch (error) {
       res.status(500).json({message: error.message});
       console.log(error);
    }
};

