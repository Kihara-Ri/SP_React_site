import React, { useState } from 'react';
import '../css/Carousel.css';

import party1 from '../assets/group_assests/party1.png';
import party2 from '../assets/group_assests/party2.png';
import party3 from '../assets/group_assests/party3.png';
import party4 from '../assets/group_assests/party4.png';

const images = [party1, party2, party3, party4]
const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (
      prevIndex === 0 ? images.length -1 : prevIndex -1
    ));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    ));
  };

  // const handleChangeSlider = () => {
  //   console.log(`切换至${currentIndex}`)
  // }

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={ prevSlide }>
        &lt;
      </button>
      <div className="carousel-images">
        {images.map((image, index) => {
          const position = (index - currentIndex + images.length) % images.length;
          return (
            <div
            key={index}
            className={`carousel-image ${
              position === 0
              ? 'center'
              : position === 1
              ? 'right'
              : position === images.length - 1
              ? 'left'
              : 'hidden'
            }`}
            >
              <img src={image} alt={`Slide ${index}`} />
            </div>
          )
        })}
      </div>
      <button className="carousel-button next" onClick={ nextSlide}>
        &gt;
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Carousel;