const express = require("express");
const router = express.Router();
router.use(express.json());
const config = require("config");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const validator = require("email-validator");
const LocalStrategy = require('passport-local').Strategy; 
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
//Login route
router.post("/", function(req, res) { 
    const {username,password} = req.body;
    const userValid = validator.validate(username);
    if(!username){ 
        return res.send({
            success:false,
            message:"Please enter Email!"
        })    
    }
    if(!userValid){
        return res.send({
            success:false,
            message:"Enter a valid Email address!"
        })
    }
    if(!password){
        return res.send({
            success:false,
            message:"Please enter Password!"
        })
    } else{ 
        passport.authenticate('local', function (err, user, info) {  
            if(err){
                return res.send({
                    success: false,
                    message: "Server error!"
                })
            }
            if(!user){
                return res.send({
                    success: false,
                    message: "Incorrect username or password!"
                })
            }else{ 
              req.login(user, function(err){ 
                if(err){ 
                  res.json({success: false, message: err}) 
                }else{ 
                    passport.authenticate("local")(req,res,function(){
                        User.findOne({username}, function(err,user){
                            if(user){
                                jwt.sign(
                                    {id:user._id},
                                    config.get("jwtSecret"),
                                    {expiresIn:60},
                                    (err, token) =>{
                                        if(err) throw err;
                                        res.json({
                                            token,
                                            success:true,
                                            user:{
                                                id:user._id,
                                                name:user.name
                                            }
                                        });
                                    }
                                ) 
                            }else{
                               res.send(err);
                           }
                        })  
                    });
                } 
              }) 
            } 
        })(req, res); 
    } 
});
module.exports = router;
