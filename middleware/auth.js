const congif = require("config");
const jwt = require("jsonwebtoken");

function auth(req,res,next){

    const token = req.header("x-auth-token");

    //Token check
    if(!token) res.status(401).json({msg: "Authorization denied"});

    try{
        // token verify
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        //add user
        req.user = decoded;
        next();

    }
    catch(e){
            res.status(400).json({msg: "Invalid token"})
    }
    }

    module.exports = auth;