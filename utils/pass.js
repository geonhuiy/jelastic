'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new Strategy(
    async (username, password, done) => {
      try {
        const user = await userModel.findOne({username});
        if (user === null) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        //Removing user password
        const strippedUser = user.toObject();
        delete strippedUser.password;
        return done(null, strippedUser, {message: 'Logged In Successfully'});
      }
      catch (err) {
        return done(err);
      }
    }));

passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: '1234',
    },
    async (jwtPayload, done) => {
      console.log('payload', jwtPayload);
      try {
        const user = await userModel.findById(jwtPayload._id,
            '-password -__v');
        if (user !== null) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
      catch (e) {
        return done(null, false);
      }
    },
));

module.exports = passport;
