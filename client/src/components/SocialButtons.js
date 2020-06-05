import React from "react";
import { Button } from 'react-bootstrap';
function SocialButtons(){


    return(
    <div className="User-Logins social-buttons">
            <a href="https://my-keep-notes-app.herokuapp.com/auth/google" >
            <Button  variant="outlined">
            <i className="social-icons fab fa-google "></i> Sign Up with Google </Button>
            </a>
            <a href="https://my-keep-notes-app.herokuapp.com/auth/facebook">
            <Button variant="outlined">
            <i className="social-icons fab fa-facebook-square  "></i> Sign Up with Facebook</Button>
            </a>
            </div>
    );
}


export default SocialButtons;