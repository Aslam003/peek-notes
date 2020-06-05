import React from "react";
import Register from "./Register";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login";

function  Signup(){
    return (
        <Router>
        <Route exact path ="/Login" component={Login}/>
               
        <Route exact path="/Register" component={Register} />
        </Router>
    );
}

export default Signup;