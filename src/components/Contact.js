import React, { useState } from 'react';
import '../css/Contact.css';
import Alert from './Alert';

import { getDatabase, ref, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDhbBQojHg-bhEITLhB_MLmS-hGCH6bGqs",
  authDomain: "job-listing-6ef2e.firebaseapp.com",
  databaseURL: "https://job-listing-6ef2e-default-rtdb.firebaseio.com",
  projectId: "job-listing-6ef2e",
  storageBucket: "job-listing-6ef2e.firebasestorage.app",
  messagingSenderId: "2793307618",
  appId: "1:2793307618:web:b575c378405cb331510dbb",
  measurementId: "G-89350S7EM2"
};

const app = initializeApp(firebaseConfig);
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
