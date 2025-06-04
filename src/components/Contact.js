import React, { useState } from 'react';
import '../css/Contact.css';
import Alert from './Alert';

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAoBfqBp3GKkGnN3AwaVEW-4xN4BzduIkE",
  authDomain: "medicinal-plant-detectio-99a9c.firebaseapp.com",
  projectId: "medicinal-plant-detectio-99a9c",
  storageBucket: "medicinal-plant-detectio-99a9c.firebasestorage.app",
  messagingSenderId: "191623698549",
  appId: "1:191623698549:web:9ea98c4b0f8c58f486c03c",
  measurementId: "G-QGNP72J0QN"
};

// ✅ Prevent "Firebase App already exists" error
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactRef = ref(database, 'contacts');
      await push(contactRef, formData);
      setAlertMessage("Form Submitted Successfully");
      setViewAlert(true);
      setTimeout(() => setViewAlert(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage("Some error occurred");
      setViewAlert(true);
      setTimeout(() => setViewAlert(false), 3000);
    }
  };

  return (
    <>
      <Alert show={viewAlert} type="success" message={alertMessage} />
      <div className="contact-glass-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h1>Contact Us</h1>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} required />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
