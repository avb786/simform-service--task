'use strict'
const passport = require('passport');
const LocalStartergy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');
const { validPassword } = require('../utils/func').funcUtility;

const jwtOpts = {}
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Will Recieve Toke From Header
jwtOpts.secretOrKey = process.env.SECRET; // Secret Key to decrypt

const verifyCallback = (payload, done) => {
    User.findOne({ _id: payload.sub })
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false)
            }
        }).catch(err => {
            done(err)
        })
}

const stratergy = new JwtStrategy(jwtOpts, verifyCallback); // jwt options, callback result

// JWT passport Authentication
passport.use(stratergy);

/**
 * Use the GoogleStrategy within Passport.
  Strategies in passport require a `verify` function, which accept
  credentials 
  @function verifyCallbackForGoogleLogin: (in this case, a token, tokenSecret, and Google profile), and
  invoke a callback with a user object.
 * 
 */

const googleOptions = {
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/api/v1/usermgmt/oauth/google/callback"
    // callbackURL: 'https://task-webapp.herokuapp.com/api/taskmgmt/oauth/google/callback'
}


const verifyCallbackForGoogleLogin = function (token, tokenSecret, profile, done) {
    const userObj = {
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        profile_image: profile._json.picture,
        email: profile._json.email,
        email_verified: profile._json.email_verified,
        oauth_provider: profile.provider
    }
    User.findOne({ email: profile._json.email }).then(user => {
        if (!user) {
            const user = new User(userObj);
            user.save()
                .then(user => {
                    done(null, profile)
                }).catch(err => {
                    console.error('Oauth Signup Error', err);
                    done(err, null);
                })
        } else {
            done(null, profile);
        }
    }).catch(err => {
        console.error('Oauth Signup Error', err);
        done(err, null);

    });
}

const googleStratergy = new GoogleStrategy(googleOptions, verifyCallbackForGoogleLogin);

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((user, done) => {
    done(null, user.id)
})

//OAuth 2.0 Google Login passport
passport.use(googleStratergy);
