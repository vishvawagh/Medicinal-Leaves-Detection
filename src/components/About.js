import React from "react";
import mp from "../Images/mp.jpeg";
import css from "../css/About.module.css";

export default function About() {
  return (
    <div className={css.container}>
      <h2>About Medicinal Plant Identification System</h2>
      <p>
        The Medicinal Plant Identification System is a comprehensive platform designed to help users identify various medicinal plants. Our system leverages advanced image recognition technology and an extensive database of plant species to provide accurate and reliable identification.
      </p>
      <img src={mp} alt="Medicinal Plants" className={css.plantImage} />
      
      <h4>Purpose</h4>
      <p>
        The primary purpose of this system is to aid researchers, herbalists, and enthusiasts in identifying medicinal plants efficiently. By using our platform, users can gain valuable insights into the characteristics and uses of different plant species.
      </p>

      <h4>Features</h4>
      <ul>
        <li><strong>Image Recognition:</strong> Upload a photo of a plant, and our system will identify it using state-of-the-art image recognition technology.</li>
        <li><strong>Extensive Database:</strong> Access detailed information about a wide variety of medicinal plants, including their botanical names, descriptions, and medicinal properties.</li>
        <li><strong>User-Friendly Interface:</strong> Intuitive and accessible for beginners and experts alike.</li>
        <li><strong>Educational Resources:</strong> Learn about traditional uses, cultivation, and benefits through guides and articles.</li>
        <li><strong>Community Interaction:</strong> Share knowledge and tips with fellow plant enthusiasts.</li>
      </ul>

      <h4>Technology</h4>
      <p>
        Our system utilizes cutting-edge machine learning algorithms and image processing techniques to identify plants. We regularly update our models and expand our database to ensure top accuracy.
      </p>

      <h4>Our Team</h4>
      <p>
        Developed by botanists, data scientists, and engineers passionate about connecting people with nature through technology.
      </p>

      <h4>Background</h4>
      <p>
        Inspired by the growing need for accessible plant identification tools, our project bridges botany and AI to create a practical, educational experience for all.
      </p>
    </div>
  );
}
