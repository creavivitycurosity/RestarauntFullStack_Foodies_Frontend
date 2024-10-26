import React from 'react';
import './Footer.css';
import ReviewsSlider from '../Components/ReviewsSlider';

function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1>Foodies</h1>
          <p>Enjoy Every moment...!</p>
        </div>
        <div className="social-icons">
          <a href="/">
            <i className="fa-brands fa-facebook-square"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-instagram-square"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-behance-square"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-twitter-square"></i>
          </a>
        </div>
      </div>

      {/* <ReviewsSlider /> */}

      <div className="email-subscription">
        <h4>Subscribe to our website</h4>
        <div className="subscription-box">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </div>
      </div>

      <div className="bottom">
  

        <div id='community'>
          <h4>Community</h4>
          <a href="/">GitHub</a>
          <a href="/">Issues</a>
          <a href="/">Project</a>
          <a href="/">Twitter</a>
        </div>

        <div>
          <h4>Help</h4>
          <a href="/">Support</a>
          <a href="/">Troubleshooting</a>
          <a href="/">Contact Us</a>
        </div>

        <div>
          <h4>Others</h4>
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Policy</a>
          <a href="/">License</a>
        </div>

        <div id='addres'>
          <h4>Address</h4>
          <a href="/">Madhapur</a>
          <a href="/">Kavari Hills</a>
          <a href="/">Plot no 20-9-01</a>
          <a href="/">Hyderabad</a>
          <a href="/">Email: revanth@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
