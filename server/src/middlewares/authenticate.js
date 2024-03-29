 const passport = require('passport');

 exports.User = (req,res,next) => {
    passport.authenticate('jwt', function(err,user,info){
         if (err) return (err);
         if(!user){ 
            // console.log("Wrong Token provided");
             return res.status(401).json({message: "Unauthorized access - No token provided"});
         }
         req.user = user;
        //  console.log(user);
         next();
     })(req,res,next);
 };

exports.UserAdmin = (req,res,next) => {
    passport.authenticate('jwt', function(err,user,info){
        if (err) return (err);

        if(!user){ 
           // console.log("Wrong Token provided");
            return res.status(401).json({message: "Unauthorized access - No token provided"});
        }
        req.user = user;
        if(!user.admin){
            return res.status(401).json({message : "Unauthorized access - No Admin Privilages"});
        }
       //  console.log(user);
        next();
    })(req,res,next);
};