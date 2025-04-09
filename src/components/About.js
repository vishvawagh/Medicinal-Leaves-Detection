import React from "react";
import mp from '../Images/mp.jpeg';
import  css from '../css/About.module.css';


export default function About() {
  return (
    <div className= {css['container']}>
            <h2>About Medicinal Plant Identification System</h2>
            <p>
                The Medicinal Plant Identification System is a comprehensive platform designed to help users identify various medicinal plants. Our system leverages advanced image recognition technology and an extensive database of plant species to provide accurate and reliable identification.
            </p>
            <img src={mp} alt="Medicinal Plants" className={css['plant-image']} />
            <h4>Purpose</h4>
            <p>
                The primary purpose of this system is to aid researchers, herbalists, and enthusiasts in identifying medicinal plants efficiently. By using our platform, users can gain valuable insights into the characteristics and uses of different plant species. Our mission is to promote the understanding and appreciation of medicinal plants and their benefits.
            </p>
            <h4>Features</h4>
            <ul>
                <li><strong>Image Recognition:</strong> Upload a photo of a plant, and our system will identify it using state-of-the-art image recognition technology.</li>
                <li><strong>Extensive Database:</strong> Access detailed information about a wide variety of medicinal plants, including their botanical names, descriptions, and medicinal properties.</li>
                <li><strong>User-Friendly Interface:</strong> Our platform is designed to be intuitive and easy to use for everyone, from beginners to experts.</li>
                <li><strong>Educational Resources:</strong> Learn about the medicinal properties, traditional uses, and cultivation of different plants through our comprehensive guides and articles.</li>
                <li><strong>Community Interaction:</strong> Join our community of plant enthusiasts to share knowledge, experiences, and tips on medicinal plants.</li>
            </ul>
            <h4>Technology</h4>
            <p>
                Our system utilizes cutting-edge machine learning algorithms and image processing techniques to accurately identify medicinal plants from uploaded images. We continuously update our models and database to ensure the highest level of accuracy and to include new plant species as they are discovered.
            </p>
            <h4>Our Team</h4>
            <p>
                The Medicinal Plant Identification System is developed and maintained by a dedicated team of botanists, data scientists, and software engineers. Our team is passionate about the intersection of technology and nature, and we strive to create tools that help people connect with and understand the natural world.
            </p>
            <h4>Background</h4>
            <p>
                The idea for this system originated from the need to make the identification of medicinal plants accessible to everyone. With the rapid advancements in technology, we saw an opportunity to combine our expertise in botany and artificial intelligence to create a tool that is both educational and practical. Since its inception, our platform has grown and evolved, incorporating feedback from our users and advancements in technology.
            </p>
            
        </div>
    );
};



