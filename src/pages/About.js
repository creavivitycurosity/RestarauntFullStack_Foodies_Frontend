import React from 'react';
import './About.css';
import Footer from './Footer';
import pic from '../assests/pic.jpg';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ReviewsSliderimg from '../Components/ReviewsSliderimg';
function About() {
  return (
    <>
      <div className="about-container">
        <div className="about-header">
          <img src={pic} alt="Restaurant" className="header-img" />
          <div className="header-text">
          <h1>Thank You For Visting </h1>
            <p>We Try Our Best To Make Your Taste Buds Dance Every Time You Think Of Us</p>
          </div>
        </div>
        <ReviewsSliderimg />

        <div className="about-content">
          <section>
            <h1>Non Veg Combo</h1>
            <p>Enjoy our delicious non-veg combos including Chicken Biryani, Mutton Biryani, Fish Mandhi, Chicken 65, and more.</p>
          </section>

          <section>
            <h1>Veg Combo</h1>
            <p>Relish our veg combos like Veg Biryani, Dal, Sambar, Curd, special veg biriyani , lemon rice, tamato rice and more.</p>
          </section>

          <section>
            <h1>Fruits</h1>
            <p>We offer fresh fruits such as Mango, Orange, Strawberry, Pomegranate, Blackberry, cheery,banana,avacado and more.</p>
          </section>

          <section>
            <h1>Information About Restaurant</h1>
            <p>
              Indian food is heavily influenced by religion, particularly Hinduism and Islam, as well as cultural choices and traditions. Historical events such as invasions, trade relations, and colonialism have played a role in introducing certain foods to India. The Columbian discovery of the New World brought new vegetables and fruits such as potatoes, tomatoes, chilies, peanuts, and guava, which have become staples in many regions of India.
            </p>
          </section>
        </div>


      </div>

      <Footer />
    </>
  );
}

export default About;
