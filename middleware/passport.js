const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const keys = require('../config/keys');
const User = require('../models/user');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtKey,
};

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        const user = await User.findOne({_id: jwt_payload.userId});
        if (user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
};
