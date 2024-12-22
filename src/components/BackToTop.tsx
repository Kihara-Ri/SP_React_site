import React, { useState, useEffect } from 'react';
import '../css/BackToTop.css';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
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
  }, [])

  return (
    <div>
      {isVisible && (
        <button className="back-to-top" onClick= { scrollToTop }>↑</button>
      )}
    </div>
  )
}

export default BackToTop;