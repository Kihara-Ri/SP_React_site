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
          <li><a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=ELMIzibXwJ9f6NJsHV-YWhKdxR71msIi&authKey=CwJ3FopgAxUucg3OlyAqP4EYiKfRsFkzOdYnO7gyiutiglBjL0HcVcMU38mddlk0&noverify=0&group_code=750301419">QQ群</a></li>
          <li><a href="https://space.bilibili.com/631081975">bilibili</a></li>
          <li><a href="https://github.com/Kihara-Ri/SP_React_site">关于网站</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;