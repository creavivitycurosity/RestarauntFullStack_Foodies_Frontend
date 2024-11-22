import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./SliderPage2.css"
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function SliderPage() {
    const [images, setImages] = useState([]);
    const [maxImages, setMaxImages] = useState(5);
    const [speed, setSpeed] = useState(500); // New speed state

    useEffect(() => {
        fetchImages();
        fetchSettings();
    }, []);

    const fetchImages = async () => {
        const response = await axios.get(`${BASE_URL}/api/images`);
        setImages(response.data);
        console.log(response.data)
    };

    const fetchSettings = async () => {
        const response = await axios.get(`${BASE_URL}/api/images/settings`);
        setMaxImages(response.data.maxImages);
        setSpeed(response.data.speed); // Set speed from settings

    };

  
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: 'black', left: '-15px' }} // Customize as needed
                onClick={onClick}
            />
        );
    };

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: 'black', right: '0px'}} // Customize as needed
                onClick={onClick}
            />
        );
    };


    const sliderSettings = {
        dots: images.length > 1, // Set dots to false if there's only one image
        infinite: images.length > 1, // Disable infinite if there's only one image
        speed: speed,  // Apply speed setting
        slidesToShow: Math.min(maxImages, images.length),
        slidesToScroll: 1,
        autoplay: images.length > 1, // Disable autoplay if there's only one image
        arrows: images.length > 1, // Show arrows only if there's more than one image
        prevArrow: images.length > 1 ? <SamplePrevArrow /> : null, // Custom previous arrow
        nextArrow: images.length > 1 ? <SampleNextArrow /> : null, // Custom next arrow
    };



    return (
        <Slider {...sliderSettings} >
            {images.map((image) => (
                <div key={image.id} className='about-img22w'>
                    <img  src={`data:image/jpeg;base64,${image.imageData}`} alt={image.title} 
                    
                    />
                      <div className='text22'>
          <h2>{image.title}</h2>
        </div>
                </div>
            ))}
        </Slider>
    );
}

export default SliderPage;
