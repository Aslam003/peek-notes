const  express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/User");
require('dotenv').config()
const config = require("config");

router.use(express.json());
router.use(session({
    secret:config.get("sessionSecret"),
    resave:false,
    saveUninitialized:false
}));
router.use(passport.initialize());
router.use(passport.session());


passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

//Google auth
  passport.use(new GoogleStrategy({
    clientID: config.get("clientId"),
    clientSecret: config.get("clientSecret"),
    callbackURL: "https://my-keep-notes-app.herokuapp.com/auth/google/keep-notes",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id ,name:profile.displayName}, function (err, user) {
      return cb(err, user);
    });
  }
));

//Facebook auth

passport.use(new FacebookStrategy({
    clientID: config.get("facebookAppId"),
    clientSecret: config.get("facebookAppSecret"),
    callbackURL: "https://my-keep-notes-app.herokuapp.com/auth/facebook/keep-notes",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof:true
  },
  function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id, name:profile.displayName }, function (err, user) {
      
      return cb(err, user);
    });
  }
));

router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/keep-notes', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    var userData = {
      id:req.user._id,
      name:req.user.name
    }
    var token = JSON.stringify(userData);
    res.redirect("/?user=" + token);
  });

  router.get('/facebook',
  passport.authenticate('facebook',{ scope: ['public_profile'] }));

router.get('/facebook/keep-notes',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    var userData = {
      id:req.user._id,
      name:req.user.name
    }    
    var token = JSON.stringify(userData);
    res.redirect('/?user=' + token);
  });


module.exports = router;