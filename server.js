const  express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Login = require("./routes/api/login");
const Register = require("./routes/api/register");
const Notes = require("./routes/api/notes");
const Auth = require("./routes/api/auth");
const User  = require("./routes/api/user");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
app.use(cors());
mongoose.connect("mongodb+srv://aslam003:aslam123@cluster0-osedu.mongodb.net/keepDB", {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("database connected");
});

//Using Routes
app.use("/Login", Login);
app.use("/Register", Register);
app.use("/Notes", Notes );
app.use("/auth", Auth);
app.use("/user",User);

//server in productoin

  app.use(express.static(path.join(__dirname,"client", "build")));
  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client","build", "index.html"));
  });


app.listen(port, function(){
    console.log(`port ${port} listening well`);
}); 