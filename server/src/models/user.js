const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose,3);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const Quiz = require('./quiz');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:"Your Email is required",
        trim:true,
    },
    password:{
        type:String,
        required:"Your password is required",

    },
    firstName:{
        type:String,
        required:"First Name is required",
    },
    lastName:{
        type:String,
        required:"Last Name is required",
    },
    phoneNumber:{
        type:String,
        required:"Phone number is required",
    },
    appeared:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Scores',
    }],
    admin:{
        type:Boolean,
        default:false,
    }
}, {timestamps:true});

UserSchema.pre('save',function(next){
    const user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassowrd = function(password){
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate()+60);

    let payload = {
        id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        appeared: this.appeared,
        score: this.score,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() /1000,10)
    });
};

mongoose.set('useFindAndModify', false);
module.exports  = mongoose.model('Users', UserSchema);