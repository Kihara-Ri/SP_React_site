import React, { useEffect, useState } from 'react';
import '../css/Navbar.css';

import icon from '../assets/icons/icon.svg';
import group_chat from '../assets/icons/group_chat.svg';
import link from '../assets/icons/link.svg';
import bilibiliFont from '../assets/icons/bilibili-font.svg';

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
          <h2 className='navbar-text'>MINECRAFT</h2>
        </a>
        <ul className="navbar-links">
          <li><a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=ELMIzibXwJ9f6NJsHV-YWhKdxR71msIi&authKey=CwJ3FopgAxUucg3OlyAqP4EYiKfRsFkzOdYnO7gyiutiglBjL0HcVcMU38mddlk0&noverify=0&group_code=750301419">
            {/* 群聊图标 */}
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11407" 
              className="inline-icon"
              >
              <path d="M784.344 938.278c-12.192 0-23.923-3.469-33.94-10.041l-32.314-20.83c-1.648-0.879-4.025-2.303-6.403-4.525l-18.779-12.422c-72.405 9.644-143.027-2.402-204.866-35.003-11.388-6.009-15.664-19.959-9.535-31.141 2.93-5.386 7.926-9.4 13.875-11.161a23.77 23.77 0 0 1 17.847 1.782c55.295 29.164 119.103 39.127 184.489 28.76a23.837 23.837 0 0 1 16.805 3.628l28.817 19.034c0.96 0.641 1.899 1.361 2.767 2.133l33.136 21.387c4.369 2.884 9.106 3.175 16.355 0.886 4.138-2.856 6.562-7.232 6.562-12.008v-58.643c0.004-7.657 3.887-14.818 10.36-19.091 65.017-42.872 103.829-110.157 103.829-179.972 0-16.419-1.899-32.42-5.63-47.574-3.359-13.51-8.458-27.183-15.09-40.615-5.648-11.427-0.801-25.192 10.839-30.741 11.664-5.538 25.638-0.783 31.286 10.64 8.096 16.352 14.297 33.118 18.478 49.838 4.62 18.74 6.952 38.394 6.952 58.452 0 81.326-42.444 159.365-114.186 211.01v46.695c0 21.787-12.188 42.072-31.811 52.942a23.049 23.049 0 0 1-3.476 1.58c-9.378 3.36-17.998 5-26.367 5m-36.158-63.157l0.025 0.032-0.025-0.032M281.533 849.288c-10.222 0-20.444-2.569-29.525-7.444-19.37-9.889-32.129-30.624-32.129-52.591v-75.126C121.903 647.898 63.816 545.146 63.816 436.903c0-193.641 181.789-351.181 405.225-351.181 223.46 0 405.246 157.54 405.246 351.181 0 193.638-181.786 351.174-405.246 351.174-22.138 0-44.803-1.697-67.465-5.042l-36.112 23.481c-1.736 1.417-3.27 2.385-4.319 3.033l-46.791 30.287c-8.717 5.973-20.562 9.452-32.821 9.452m187.508-717.565c-197.616 0-358.388 136.908-358.388 305.18 0 96.41 54.313 188.202 145.291 245.541 6.714 4.231 10.775 11.529 10.771 19.363v87.445c0 4.865 3.019 9.793 7.317 12.008 6.041 3.235 12.465 1.548 14.02 0.514l46.586-30.184c0.709-0.436 1.006-0.627 1.052-0.627 0 0 0 0.021-0.025 0.053a20.79 20.79 0 0 1 2.583-1.963l45.058-29.323a23.879 23.879 0 0 1 16.876-3.504c23.165 3.887 46.334 5.85 68.858 5.85 197.638 0 358.412-136.904 358.412-305.173 0.001-168.272-160.773-305.18-358.411-305.18M334.659 771.927c0 0.011-0.025 0.021-0.025 0.032 0-0.011 0.025-0.018 0.025-0.032" p-id="11408"
              fill="currentColor"
              ></path>
              <path d="M364.833 433.714c0 21.624-17.957 39.265-39.974 39.265-22.017 0-39.978-17.641-39.978-39.265 0-21.62 17.96-39.258 39.978-39.258 22.017 0 39.974 17.637 39.974 39.258z m147.162 7.518c0 19.544-16.238 35.488-36.14 35.488-19.905 0-36.137-15.944-36.137-35.488 0-19.548 16.231-35.492 36.137-35.492 19.901 0 36.14 15.945 36.14 35.492z m133.035 0c0 19.544-16.238 35.488-36.137 35.488-19.906 0-36.14-15.944-36.14-35.488 0-19.548 16.235-35.492 36.14-35.492 19.899 0 36.137 15.945 36.137 35.492z" p-id="11409"
              fill="currentColor"
              >
            </path></svg>
          QQ群</a></li>
          {/* <li><a href="https://space.bilibili.com/631081975">
            <img src={bilibiliFont} style={{ width: '50px'}} alt="bilibili-font" />
          </a></li> */}
          <li><a href="https://github.com/Kihara-Ri/SP_React_site">
          {/* link图标 */}
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3314"
              className="inline-icon"
              id='link'
            >
              <path d="M633.417143 429.007238a174.567619 174.567619 0 0 1 0 246.857143l-155.306667 155.306667a186.709333 186.709333 0 1 1-264.045714-264.045715l76.483048-76.507428 51.73638 51.736381-76.507428 76.507428a113.566476 113.566476 0 1 0 160.597333 160.597334l155.306667-155.306667a101.424762 101.424762 0 0 0 0-143.408762z m208.603428-225.816381a186.709333 186.709333 0 0 1 0 264.045714L765.561905 543.744l-51.736381-51.712 76.507428-76.507429a113.566476 113.566476 0 1 0-160.597333-160.597333l-155.306667 155.306667a101.424762 101.424762 0 0 0 0 143.408762l-51.736381 51.736381a174.567619 174.567619 0 0 1 0-246.857143l155.306667-155.306667a186.709333 186.709333 0 0 1 264.045714 0z" p-id="3315" 
              fill="currentColor"></path></svg>
          关于网站</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;