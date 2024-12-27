import React, { useEffect, useState} from 'react';
import '../css/OpenGraph.css';
import BottomArrow from '../assets/icons/bottomArrow.svg';

function OpenGraph() {
  const [overlayOpacity, setOverlayOpacity] = useState(0); // 控制overlay透明度
  const [blurAmount, setBlurAmount] = useState(0); // 控制图片模糊程度

  useEffect(() => {
    const handleScrollEffect = () => {
      const scrollY = window.scrollY; // 当前滚动距离
      const targetHeight = document.querySelector(".OpenGraph")!.clientHeight; // 开屏图片高度
      const newOverlayOpacity = Math.min(scrollY / targetHeight, 1) // 根据滚动距离计算叠加层透明度
      setOverlayOpacity(newOverlayOpacity);

      // 计算模糊程度 滚动到图片一半时模糊度达到最大值
      const maxBlur = 8;
      const newBlurAmount = Math.min((scrollY / (targetHeight / 2)) * maxBlur, maxBlur);
      setBlurAmount(newBlurAmount);
    }
    window.addEventListener("scroll", handleScrollEffect);

    return () => {
      window.removeEventListener("scroll", handleScrollEffect); // 清理事件监听器
    }
  }, []);

  const handleScroll = () => {
    const startPosition = window.scrollY;
    const navHeight = document.querySelector("nav")?.offsetHeight || 0; // 动态获取导航栏高度, 不存在就返回0
    const targetPosition = document.querySelector(".OpenGraph")!.clientHeight - navHeight; // 目标位置为开屏图片的高度 - 导航栏高度
    const distance = targetPosition - startPosition;
    const duration = 600; // 动画持续时间(ms)
    let startTime: number | null = null;

    // 缓出效果 函数 f(t) = -c(t/d)*(t/d - 2) + b
    const easeOutQuad = (time: number, start: number, change: number, duration: number) => {
      time /= duration;
      return -change * time * (time - 2) + start;
    };

    const scrollAnimation = (currentTime : number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollY = easeOutQuad(timeElapsed, startPosition, distance, duration);

      window.scrollTo(0, scrollY);

      if (timeElapsed < duration) {
        requestAnimationFrame(scrollAnimation); // 继续动画
      } else {
        window.scrollTo(0, targetPosition); // 确保最终位置准确
      }
    };

    requestAnimationFrame(scrollAnimation);
  }

  return (
    <div className="OpenGraph">
      <div
        className="overlay"
        style={{ opacity: overlayOpacity }}
      ></div>
      <div
        className="open-image"
        style={{
          filter: `blur(${blurAmount}px)` // 应用模糊度
        }}
      ></div>
      <h1 className="title">Every Minecrafter へ</h1>
      <div className="scroll_button" onClick={ handleScroll }>
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3292" 
          fill="currentColor"
          className="bottom-arrow"
          style={{ width: '30px', height: '30px'}}
          >
          <path d="M480.734844 723.480575C498.232302 739.948506 525.833655 739.88643 543.265156 723.480575L950.080945 340.601305C962.15796 329.234887 962.857272 310.097487 951.6429 297.856728 940.428528 285.615969 921.547129 284.907176 909.470114 296.273595L502.654325 679.152865C508.079551 674.046852 515.901757 674.02926 521.345675 679.152865L114.529886 296.273595C102.452871 284.907176 83.571471 285.615969 72.3571 297.856728 61.142729 310.097487 61.84204 329.234887 73.919055 340.601305L480.734844 723.480575Z" fill="currentColor" p-id="3293">
          </path>
        </svg>
      </div>
    </div>
  )
}

export default OpenGraph;