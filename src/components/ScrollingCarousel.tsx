import React, { useState, useEffect, useRef } from 'react';
import '../css/ScrollingCarousel.css';

import img1 from '../assets/group_assests/jinja.png';
import img2 from '../assets/group_assests/jinja_complex.png';
import img3 from '../assets/group_assests/magic_circle2.png';
import img4 from '../assets/group_assests/sakura_tree.png';
import img5 from '../assets/group_assests/spring.png';

const images = [
  img1, img2, img3, img4, img5
]

const ScrollingCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false); // 控制是否暂停
  const carouselRef = useRef<HTMLDivElement>(null); // 引用轮播容器
  const scrollStep = 1; // 每次滚动的像素量

  const isImageFullyVisible = (imageElement: HTMLElement) => {
    const carousel = carouselRef.current;
    if (!carousel || !imageElement) return false;

    const imageRect = imageElement.getBoundingClientRect();
    const containerRect = carousel.getBoundingClientRect();

    return (
      imageRect.left >= containerRect.left &&
      imageRect.right <= containerRect.right
    );
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0; // 回到初始位置
      } else {
        carousel.scrollLeft += scrollStep;
      }
    };

    let interval: NodeJS.Timeout | null = null;
    if (!isPaused) {
      interval = setInterval(handleScroll, 16); // 大约60FPS
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused]);

  return (
    <div
      className="carousel-container"
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)} // 鼠标进入时暂停
      onMouseLeave={() => setIsPaused(false)} // 鼠标离开时恢复滚动
    >
      <div className="carousel-track">
        {images.concat(images).map((image, index) => (
          <div
            className="carousel-item"
            key={index}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                if (isImageFullyVisible(target)) {
                  target.style.transform = "scale(1.1)"; // 放大
                }
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = "scale(1)"; // 恢复正常大小
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingCarousel;