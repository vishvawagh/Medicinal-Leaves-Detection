import React from "react";
import Github from '../Images/Github.png';
import Linkedin from '../Images/linkedin.png';
import Instagram from '../Images/instagram.jpeg';
import Gmail from '../Images/gmail.png';
import Twitter from '../Images/twitter.avif';
import "../css/Fotter.css";

export default function Fotter() {
  return (
    <footer className="main">
      <div className="social-links">
        <a href="https://github.com/vishvawagh" target="_blank" rel="noopener noreferrer">
          <img src={Github} alt="GitHub" />
        </a>
        <a href="https://www.instagram.com/vishvawagh453/" target="_blank" rel="noopener noreferrer">
          <img src={Instagram} alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com/in/vishvachaitanya-wagh-892573246/" target="_blank" rel="noopener noreferrer">
          <img src={Linkedin} alt="LinkedIn" />
        </a>
        <a href="https://x.com/vishvawagh453?t=yx-M0Uhzp9C8SwkiMOZMzg&s=09" target="_blank" rel="noopener noreferrer">
          <img src={Twitter} alt="Twitter" />
        </a>
        <a href="mailto:vishvachaitanaya345@gmail.com">
          <img src={Gmail} alt="Gmail" />
        </a>
        <h5><i>&copy; 2024 with ❤️ by VW</i></h5>
      </div>
    </footer>
  );
}
