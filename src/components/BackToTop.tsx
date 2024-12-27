import React, { useState, useEffect } from 'react';
import '../css/BackToTop.css';

import backIcon from '../assets/icons/back-to-top.svg';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const ratio = Math.min((scrollTop / scrollHeight) * 100, 100);
    setScrollRatio(Math.round(ratio));
    setIsVisible(scrollTop > 1000); // 超过1000px时显示按钮
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {isVisible && (
        <button 
          className={`back-to-top ${isVisible ? 'fade-in' : 'fade-out'}`} 
          onClick={scrollToTop} 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <img 
              src={backIcon} 
              alt="back-to-top-icon" 
            />
          ) : (
            <span>{scrollRatio}</span>
          )}
        </button>
      )}
    </div>
  );
};

export default BackToTop;