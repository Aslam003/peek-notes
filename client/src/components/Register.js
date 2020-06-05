import React, { useState } from 'react';
import { MDBContainer, MDBAlert } from 'mdbreact';
import axios from "axios";
import SocialButtons from "./SocialButtons";
import {Button} from 'react-bootstrap';
import {useForm} from "react-hook-form";
function Register() {
    const [visible, setVisible] = useState(false);
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState(null);
    const onSubmit= (data) =>{
        setVisible(false); 
        axios.post("/register", data)
        .then(function(res){            
            if(res.data.success){
                localStorage.setItem("token",JSON.stringify(res.data.user));
                window.location.href='/';
            }else{
                setError(res.data.message);
                setVisible(true);                
            }
        })
    }
    return (<div className="signup-form">
        <form className = "User-Logins" onSubmit = {handleSubmit(onSubmit)} >
        <h2 className="signup-headings">Register</h2>
        {visible && <MDBContainer 
        style={{margin:0, padding:0, fontSize:".8rem", fontWeight:400}}>
      <MDBAlert color="danger">
       {error}
      </MDBAlert>
      </MDBContainer>}
        <input type = "text"
        name = "name"
        placeholder = "Name"
        ref = {register()}
        /> 
        <input type = "text"
        name = "username"
        placeholder = "Email"
        ref = {register()}
        /> 
        <input type = "password"
        name = "password"
        placeholder = "Password"
        ref = {register()}
        /> 
        <input type = "password"
        name = "confirmPassword"
        placeholder = "Confirm Password"
        ref = {register()}
        />  
        
        <Button  type = "submit" variant = "outlined" > Register </Button> 
        </form > 
        <SocialButtons / >
        </div>);
    }

    export default Register;


