require('dotenv').config();

const secret = process.env.JWT_SECRET;
const port = process.env.PORT;

const Jwtstrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

      const User = require('../models/user');

      const opts = {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: secret,
        };

        module.exports = passport => {
            // console.log("secret :",secret);
            // console.log("port :",port);
            passport.use(
                new Jwtstrategy(opts, (jwt_payload, done) => {
                    User.findById(jwt_payload.id)
                        .then(user => {
                            if(user) return done(null, user);
                            return done(null, false);
                        })
                        .catch(err => {
                            return done(err, false , {message: 'Server Error'});
                        });
                })
            );
        };