import React from 'react';
import './Contact.css';
import Footer from './Footer';

function Contact() {
  return (
    <>
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Please fill out the form below with your queries or feedback.</p>
        </div>

        <div className="contact-form-container">
          <form className="contact-form">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name.." required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your email.." required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Write something.." required></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
