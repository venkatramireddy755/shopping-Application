import React, { useState } from 'react';
import './ContactUs.css'; // Add some basic styling

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log('Submitting form:', formData);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log('Server response:', response);

      if (response.ok) {
        setSuccessMessage('Thank you for reaching out to us! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        setErrorMessage(errorData.error || 'There was an issue submitting your request. Please try again.');
        
      }
    } catch (error) {
        console.error('Network error:', error);
        setErrorMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
