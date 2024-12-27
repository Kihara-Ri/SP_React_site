import React, { useEffect, useState, useRef } from 'react';
import './SlideImage.css'; // 假设样式文件中定义了必要的 CSS 样式

interface ImageOptions {
  imageSrc: string[];
  autoPlay?: boolean; // 是否自动轮播 || true
  control?: boolean; // 是否接受用户控制 || true
  fixedRatio?: boolean; // 是否固定图片比例 || false
  imageSize?: { width?: string; height?: string}; // 图片大小
}

const SlideImage: React.FC<ImageOptions> = ({
  imageSrc,
  autoPlay = true,
  control = true,
  fixedRatio = false,
  imageSize,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startXRef = useRef<number | null>(null);
  const deltaXRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // 动态设置容器宽度
  useEffect(() => {
    if (imageSize?.width) {
      // 如果手动设置了图片宽度, 则直接使用
      const width = parseInt(imageSize.width, 10);
      setContainerWidth(width);
    } else {
      // 否则动态计算图片的宽度
      const img = new Image();
      img.src = imageSrc[0];
      img.onload = () => {
        setContainerWidth(img.width);
    }
    }
  }, [imageSrc]);

  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }

    return () => stopAutoPlay();
  }, [currentIndex, autoPlay]);

  const startAutoPlay = () => {
    stopAutoPlay();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSrc.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSrc.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoPlay();
    startXRef.current = e.touches[0].clientX;
    deltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current !== null) {
      deltaXRef.current = e.touches[0].clientX - startXRef.current;
    }
  };

  const handleTouchEnd = () => {
    if (deltaXRef.current > containerRef.current!.clientWidth / 2) {
      handlePrevious();
    } else if (deltaXRef.current < -containerRef.current!.clientWidth / 2) {
      handleNext();
    }
    startXRef.current = null;
    deltaXRef.current = 0;
    if (autoPlay) {
      startAutoPlay();
    }
  };

  return (
    <div
      className="slide-container"
      style={{ width: containerWidth ? `${containerWidth}px` : `auto`}}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="slide-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageSrc.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt={`Slide ${index}`} 
            className={`slide-image ${fixedRatio ? 'slide-image fixed-aspect-ratio' : 'slide-image'}`}
            style={{
              maxWidth: imageSize?.width || '100%',
              maxHeight: imageSize?.height || 'auto',
            }}
            />
        ))}
      </div>
      {control && (
        <>
          <button className="slide-control prev" onClick={handlePrevious}>
            &#9664;
          </button>
          <button className="slide-control next" onClick={handleNext}>
            &#9654;
          </button>
        </>
      )}
    </div>
  );
};

export default SlideImage;