import React, { useEffect, useRef } from 'react';
import main from '../utils/core.ts';
import '../css/BalloonsScene.css';

const BalloonsScene: React.FC = () => {
  const initialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // 初始化主函数
    if (!initialized.current) {
      if (canvasRef.current && containerRef.current) {
        main(canvasRef.current, containerRef.current);
        initialized.current = true;
      }
    };

    // 使用 ResizeObserver 监听尺寸变化
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (container && canvas) {
      const resizeObserver = new ResizeObserver(() => {
        const { width, height } =container.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      });
      resizeObserver.observe(container);
      // 清理观察器
      return () => resizeObserver.disconnect();
    }
}, []);
  return (
    <div className="balloons-scene">
      <div className="balloons-container" ref={containerRef}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <button
        id="toggle-gravity"
        style={{ whiteSpace: 'pre-wrap', textAlign: 'center'}}
        >
        放飞{"\n"}气球
      </button>
    </div>
  )
}

export default BalloonsScene;