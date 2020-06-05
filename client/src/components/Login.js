import React, { useState } from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import { MDBContainer, MDBAlert } from 'mdbreact';
import SocialButtons from "./SocialButtons";
import {Button} from 'react-bootstrap';
import { set } from "mongoose";
function Login() {
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState();
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) =>{       
        setVisible(false); 
        axios.post("/Login", data)
        .then(function(res){
            if(res.data.success){
                localStorage.setItem("token",JSON.stringify(res.data.user));
                window.location.href='/';
            }
            else{
                if(res.data.message){
                    setError(res.data.message);
                    setVisible(true);
                }
            }
        })
    }
    return ( <div className="signup-form">
     <form className = "User-Logins" onSubmit={handleSubmit(onSubmit)}>
     <h2 className="signup-headings">Login</h2>
     {visible && <MDBContainer 
        style={{margin:0, padding:0, fontSize:".8rem", fontWeight:400}}>
      <MDBAlert color="danger">
       {error}
      </MDBAlert>
      </MDBContainer>}
        <input type = "text"
        name = "username"
        placeholder = "Email"
        ref = {register}
        /> 
        <input type = "password"
        name = "password"
        placeholder = "Password"
        ref = {register}
        />  
        <Button type ="submit" className = "login-button" variant = "outlined" > Login </Button> 
        <p className = "register-text" > < Link to = "/Register" > create </Link> account</p>
        </form> 
        <SocialButtons/>
        </div>
    );
}
export default Login;