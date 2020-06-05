const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const userRegisterSchema = new mongoose.Schema({
    name : {
        type:String,
        default: ""
    },
    username :{
        type:String,
        default: ""
    },
    googleId:{
        type:String
    },
    facebookId:{
        type:String
    },
    register_date:{
        type:Date,
        default:Date.now
    },
    password:{
        type:String
    }
});
userRegisterSchema.plugin(passportLocalMongoose);
userRegisterSchema.plugin(findOrCreate);
const User = mongoose.model("User", userRegisterSchema);
module.exports = User;