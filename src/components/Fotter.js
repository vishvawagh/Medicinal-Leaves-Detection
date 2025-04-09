import React from "react";
import Github from '../Images/Github.png';
import linkedin from '../Images/linkedin.png';
import instagram from '../Images/instagram.jpeg';
import gmail from '../Images/gmail.png';
import twitter from '../Images/twitter.avif';
import "../css/Fotter.css";
export default function Fotter(){
    return(
        <footer className="main">
        <div className="social-links">
          <a href="https://github.com/vishvawagh"><img src={Github}  alt=" Links"></img> </a>
          <a href="https://www.instagram.com/vishvawagh453/"> <img src={instagram} alt=" Links"/></a>
          <a href="https://www.linkedin.com/in/vishvachaitanya-wagh-892573246/" > <img src={linkedin} alt=" Links"/></a> 
          <a href="https://x.com/vishvawagh453?t=yx-M0Uhzp9C8SwkiMOZMzg&s=09"> <img src={twitter} alt=" Links"/></a> 
          <a href="mailto : vishvachaitanaya345@gmail.com"> <img src={gmail} alt=" Links"/></a> 
          <h5> <i>&copy; 2024 with &hearts; by VW </i></h5>
           </div>        
          
         </footer>
    )
}