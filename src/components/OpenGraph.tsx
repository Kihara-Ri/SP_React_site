import React, { useEffect, useState} from 'react';
import '../css/OpenGraph.css';

function OpenGraph() {
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    const handleScrollEffect = () => {
      const scrollY = window.scrollY; // 当前滚动距离
      const targetHeight = document.querySelector(".OpenGraph")!.clientHeight; // 开屏图片高度
      const newOverlayOpacity = Math.min(scrollY / targetHeight, 1) // 根据滚动距离计算叠加层透明度
      
      setOverlayOpacity(newOverlayOpacity);
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
      <h1 className="title">Minecraft</h1>
      <div className="scroll_button" onClick={ handleScroll }></div>
    </div>
  )
}

export default OpenGraph;