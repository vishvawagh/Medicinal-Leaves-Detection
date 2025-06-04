import React, { useState } from 'react';
import '../css/Contact.css';

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAoBfqBp3GKkGnN3AwaVEW-4xN4BzduIkE",
  authDomain: "medicinal-plant-detectio-99a9c.firebaseapp.com",
  projectId: "medicinal-plant-detectio-99a9c",
  storageBucket: "medicinal-plant-detectio-99a9c.firebasestorage.app",
  messagingSenderId: "191623698549",
  appId: "1:191623698549:web:9ea98c4b0f8c58f486c03c",
  measurementId: "G-QGNP72J0QN"
};

// Prevent duplicate Firebase init
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactRef = ref(database, 'contacts');
      await push(contactRef, formData);

      // Clear form data after successful submit
      setFormData({ name: '', email: '', message: '' });

      // Show success toast
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Some error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="contact-glass-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h1>Contact Us</h1>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Toast container to show toast messages */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ContactForm;
