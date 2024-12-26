import React, { useEffect, useRef } from 'react';
import main from '../utils/core.ts';
import '../css/BalloonsScene.css';

const BalloonsScene: React.FC = () => {
  const initialized = useRef(false);
  useEffect(() => {
    // 初始化主函数
    if (!initialized.current) {
      main();
      initialized.current = true;
    }
  }, []);
  return (
    <div className="balloons-scene">
      <div className="balloons-container"></div>
      <button
        id="toggle-gravity"
        style={{ whiteSpace: 'pre-wrap', textAlign: 'center'}}
        >
        启用{"\n"}重力
      </button>
    </div>
  )
}

export default BalloonsScene;