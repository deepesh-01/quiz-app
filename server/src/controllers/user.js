const User = require('../models/user');
const mongoose = require('mongoose');

// @route get admin/user
// @desc returns all users
// @access public 

exports.index = async function (req,res){
    console.log("req.user :",req.user);
    const  users = await User.find({});
    res.status(200).json({users});
};

exports.jwtVerify = async (req,res) => {
    try{
        const _id = req.user._id;
        // const _id = mongoose.Types.ObjectId(userid);
        const user = await User.findById({_id});
        console.log("user jwt verify",user)
        res.status(200).json({user});
    }
    catch(error) {
        res.status(500).json({success:false, message: error.message});
    }
}

// @route Post api/user
// @desc add a new user 
// @access public

exports.store = async (req,res) => {
    try{
        const {email} = req.body;

        // check if account already exists
        const user = await User.findOne({email});

        if(user) return res.status(401).json({message:"This email is already registered!"});
        const newUser = new User({...req.body});
        const user_ = await newUser.save();

    }
    catch(error) {
        res.status(500).json({success:false, message: error.message});
    }
};

// @route Get api/user/{id}
// @desc returns a specific user 
// @access public

exports.show = async (req,res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) return res.status(401).json({message:"User does not exist"});
        res.status(200).json({user});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

// @route Put api/use/{id}
// @desc update user details 
// access public 

exports.update = async (req,res) => {
    try {
        const update = req.body;
        const userId = req.user._id;
        console.log("update :",update);
        console.log("userid :",userId);

        const user = await User.findByIdAndUpdate(userId,{$set : update},{new:true});

        return res.status(200).json({user,message:"Details are updated"}); 
       }
       catch (error) {
        res.status(500).json({message: error.message});
        console.log(error);
    }
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public

exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        const user_id = req.user._id;

        //Make sure the passed id is that of the logged in user
        if (user_id.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});

        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'User has been deleted'});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};