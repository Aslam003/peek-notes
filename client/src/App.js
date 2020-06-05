import React, {useEffect, useState} from "react";
import Footer from "./components/Footer";
import { Switch, Route} from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { useDispatch} from "react-redux";
import {addNotes,deleteNotes} from "./actions/noteAction";
import 'bootstrap/dist/css/bootstrap.min.css';
import {setItemsLoading} from "./actions/noteAction";
import {Tooltip, OverlayTrigger} from "react-bootstrap";
import axios from "axios";

function App(){ 
        const dispatch = useDispatch();
        const [user, setUser]= useState();
        useEffect(() => {
                const token = JSON.parse(localStorage.getItem("token"));
                if(token){
                        axios.post("/Notes/users",token)
                        .then(function(res){
                        dispatch(deleteNotes(0));
                        res.data.map(notes =>{
                     return dispatch(addNotes(notes));
                    });
                });
                        dispatch(setItemsLoading(token));
                        let name = token.name.split(" ")[0];
                        setUser(name[0].toUpperCase() + name.slice(1));
                } 
        }, [dispatch]);
        function handleClick(){
                window.location.reload(true);
                dispatch(setItemsLoading("null"));
                localStorage.removeItem("token");
                setUser(null);
        }

    return <div>   
     
    <header>
            {user ?  
            <OverlayTrigger
          placement="bottom"
          delay={{ show: 50, hide: 100 }}
          overlay={  <Tooltip id="button-tooltip" >
           Click to Logout
          </Tooltip>}
        >
          <div onClick = {handleClick}
            className="account-name">
            Hi {user}!
            </div>
        </OverlayTrigger> : <div onClick = { () => window.location.href="/login"}  className="userAccountIcon">

            <OverlayTrigger
          placement="bottom"
          delay={{ show: 50, hide: 100 }}
          overlay={  <Tooltip id="button-tooltip" >
           Click to Login
          </Tooltip>}
        >
          <i  className="fas fa-user-plus"></i>
        </OverlayTrigger>
        </div>}

        <h1>Peek Notes</h1>   
</header>
        <Switch>
    <Route  exact path = "/"   component={Home}/> 
    <Route exact path ="/Login"  component = {Signup}/>
    <Route exact path ="/Register"  component={Register}/>
    </Switch>
    <Footer/>
    </div>
}

export default App;


