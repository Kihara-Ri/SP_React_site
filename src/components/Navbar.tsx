import React, { useEffect, useState } from 'react';
import '../css/Navbar.css';
import icon from '../assets/icons/icon.svg';

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <nav className={`navbar ${showNavbar ? 'visible' : 'hidden'}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={icon} alt="logo" width="32" height="32" className="navbar-logo" />
          logo
        </a>
        <ul className="navbar-links">
          <li><a href="/">链接1</a></li>
          <li><a href="/">链接2</a></li>
          <li><a href="/">链接3</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;