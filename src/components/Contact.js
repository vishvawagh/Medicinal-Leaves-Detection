import React, { useState } from 'react';
import '../css/Contact.css';
import Alert from './Alert';

// Import Firebase functions with duplicate initialization check
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDdeuAJui9LfytbNdnv1lHrnRHshxVPCGk",
  authDomain: "tasty-temptations-62a09.firebaseapp.com",
  projectId: "tasty-temptations-62a09",
  storageBucket: "tasty-temptations-62a09.appspot.com",
  messagingSenderId: "308979770967",
  appId: "1:308979770967:web:f28d1be528b84c33692512",
  measurementId: "G-K0Y6T20J4Q"
};

// Initialize Firebase only if it hasn't been initialized already.
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setFormData({ name: '', email: '', message: '' }); // Reset form
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
