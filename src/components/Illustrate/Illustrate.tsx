import React from 'react';
import SlideImage from '../SlideImage/SlideImage';
import './Illustrate.css';

import img1 from "../../assets/group_assests/snuggle1.png";
import img2 from "../../assets/group_assests/snuggle2.png";
import img3 from "../../assets/group_assests/snuggle3.png";
import img4 from "../../assets/group_assests/pumpkin_head.png";
import img5 from "../../assets/group_assests/spring.png";

import f1 from "../../assets/Fries on the pier/f1.jpg";
import f2 from "../../assets/Fries on the pier/f2.jpg";
import f3 from "../../assets/Fries on the pier/f3.jpg";
import f4 from "../../assets/Fries on the pier/f4.jpg";

const Illustrate: React.FC = () => {
  return (
    <div className="illustrate-container">
      <SlideImage 
        imageSrc={[ img1, img2, img3, img4, img5 ]}
      />
      <div className="get-fries">
        <h2>去码头整点薯条也不错</h2>
        <SlideImage
          imageSrc={[ f1, f2, f3, f4 ]}
          imageSize={{ width: '180px', height: '180px'}}
        />
      </div>
    </div>
  )
}

export default Illustrate;