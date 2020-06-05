import React from "react";

function Footer(){
    const date = new Date();
    
    return <footer>
       <p>created by Aslam <i class="far fa-copyright"> {date.getFullYear()}</i></p>
    </footer>
}

export default Footer;