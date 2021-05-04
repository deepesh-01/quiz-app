 const passport = require('passport');

 module.exports = (req,res,next) => {
     passport.authenticate('jwt', function(err,user,info){
         if (err) return (err);

         if(!user) return res.status(401).json({message: "Unauthorized access - No token provided"});

         req.user = user;

         next();
     })(req,res,next);
 };