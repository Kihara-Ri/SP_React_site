import React from 'react';
import SlideImage from '../SlideImage/SlideImage';
import './Illustrate.css';
import fries from '../../assets/Fries on the pier.jpg';

const Illustrate: React.FC = () => {
  return (
    <div className="illustrate-container">
      {/* <SlideImage  /> */}
      <h1>去码头整点薯条也不错</h1>
      <img src={fries} alt="Fries on the pier" 
        style={{
          maxWidth: '300px',
          minWidth: '100px',
          width: '100%',
          height: 'auto'
        }}
      />
    </div>
  )
}

export default Illustrate;