const User = require('../models/user');

// @route Post api/auth/register
// @desc Register User
// @access Public

exports.register = (req,res) => {
    User.findOne({email:req.body.email})
        .then(user => {
            if (user) return res.status(401).json({message: 'Error! User already registerd'});

            //create and save user 
            const newUser = new User(req.body);
            newUser.save()
                .then(user => res.status(200).json({token: user.generateJWT(), user: user}))
                .catch(err => res.status(500).json({message:err.message}));
        })
        .catch(err => res.status(500).json({success:false, message: err.message}));

};

// @route Post api/auth/login
// @desc Login user and generate JWT token
// @access Public

exports.login = (req,res) =>{
    User.findOne({email : req.body.email})
        .then(user => {
            if(!user) return res.status(401).json({msg : 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'})

            // validate password

            if(!user.comparePassowrd(req.body.password)) return res.status(401).json({message:"Invalid email or password"});

            // login successful, write token, and send back user 
            res.sendStatus = 200;
            res.json({token: user.generateJWT(), user:user});
        })
        .catch(err => {res.status(500).json({code:err.code,message:err.message})
                       console.log(err)});
};