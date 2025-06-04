import React, { useState } from 'react';
import '../css/Contact.css';

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

// ✅ Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const messagesRef = ref(database, 'messages');
    push(messagesRef, formData)
      .then(() => {
        toast.success('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        toast.error('Submission failed. Try again!');
      });
  };

  return (
    <div className="contact-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
        />
        <button type="submit">Send Message</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ContactForm;
