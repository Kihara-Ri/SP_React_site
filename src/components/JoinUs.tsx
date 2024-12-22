import React from 'react';
import '../css/JoinUs.css';
import QRCodeImage from '../assets/group_chat.jpg'

const JoinUs: React.FC = () => {
  return (
    <div className="join-us-container">
      <h2 className="join-us-title">加入我们!</h2>
      <div className="qr-code-wrapper">
        <img src={QRCodeImage} alt="Join us QR Code" className="qr-code-image" />
      </div>
    </div>
  )
}

export default JoinUs;