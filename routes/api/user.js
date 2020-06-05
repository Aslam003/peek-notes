const express = require("express");
const router = express.Router();
router.use(express.json());
const User = require("../../models/User");

// Finding User
router.post("/", function(req,res){
    User.findOne({username:req.body.username}, function(err,user){
        if(user){
            res.send(user);
        }
        else{
            res.send(err);            
        }
    });
});


module.exports = router;