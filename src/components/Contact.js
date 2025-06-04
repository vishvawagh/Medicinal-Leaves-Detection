import React, { useState } from 'react';
import '../css/Contact.css';
import Alert from './Alert';

import { getDatabase, ref, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// ✅ Correct Firebase config with fixed storageBucket domain
const firebaseConfig = {
  apiKey: "AIzaSyDdeuAJui9LfytbNdnv1lHrnRHshxVPCGk",
  authDomain: "tasty-temptations-62a09.firebaseapp.com",
  projectId: "tasty-temptations-62a09",
  storageBucket: "tasty-temptations-62a09.appspot.com",
  messagingSenderId: "308979770967",
  appId: "1:308979770967:web:f28d1be528b84c33692512",
  measurementId: "G-K0Y6T20J4Q"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // UX improvement

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const contactRef = ref(database, 'contacts');
      await push(contactRef, formData);
      setFormData({ name: '', email: '', message: '' }); // Clear form
      setAlertMessage("Form Submitted Successfully");
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage("Some error occurred");
    } finally {
      setViewAlert(true);
      setTimeout(() => setViewAlert(false), 3000);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Alert show={viewAlert} type="success" message={alertMessage} />
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

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
