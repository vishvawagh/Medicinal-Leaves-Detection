import React, { useState } from 'react';
import '../css/Contact.css';
import Alert from './Alert';

import { getDatabase, ref, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCkW5aNsQwfcl9a6QZTVG1GKpW6FfW8CPI",
  authDomain: "student-management-f793a.firebaseapp.com",
  projectId: "student-management-f793a",
  storageBucket: "student-management-f793a.appspot.com",
  messagingSenderId: "820420097518",
  appId: "1:820420097518:web:9a3ff0cb8c5b3d7fc24aff",
  measurementId: "G-38FTZ6ZQ53"
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
