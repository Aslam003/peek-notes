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
passport.use(new LocalStrategy(User.authenticate())); 
router.post("/", function(req,res) {    
    const {name,username,password,confirmPassword} = req.body;
    const userValid = validator.validate(username);
    if(!name){
        return res.send({
            success:false,
            message:"Enter name first"
        })
    }
    if(!username){
        return res.send({
            success:false,
            message:"Enter Email first"
        })
    }
    if(!userValid){
        return res.send({
            success:false,
            message:"Enter a valid Email!"
        })
    }
    if(!password){
        return res.send({
            success:false,
            message:"Enter password"
        })
    }
    if(password.length < 6){
        return res.send({
            success:false,
            message:"Password should be minimum 6 letters!"
        })
    }
    if(!confirmPassword){
        return res.send({
            success:false,
            message:"confirm your password"
        })
    }
    if(password !== confirmPassword){
        return res.send({
            success:false,
            message:"password mismatch!"
        })
    }

    User.find({username:username}, (err,foundUser) => {
        if(err){
            return res.send({
                success: false,
                message: "server error!"
            })
        }
        else if(foundUser.length > 0){
            return res.send({
                success:false,
                message:"User already exists!"
            })
        }
        else{
            User.register({name,username}, password, function(err,user){
                if(user){ 
                    passport.authenticate("local")(req,res,function(){     
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
                    });
                   
                }else {
                    res.send(err);
                }
            });
        }
    })
});


module.exports = router;