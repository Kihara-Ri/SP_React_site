import React from 'react';
import '../css/AboutInfo.css'
import brick_icon from '../assets/mc_icons/brick_icon.png';
import fishing_rod_icon from '../assets/mc_icons/fishing_rod_icon.png';
import pickaxe_icon from '../assets/mc_icons/pickaxe_icon.png';
import redstone_dust_icon from '../assets/mc_icons/redstone_dust_icon.png';

const AboutInfo: React.FC = () => {
  return (
    <section className="about-container">
      <h2 className="about-title">海の城</h2>
      <p>我们是一个拥有200+成员的Minecraft玩家群体</p>
      <p>无论你是
        <img src={redstone_dust_icon} className="inline-icon" />
        硬核生电玩家, 还是
        <img src={brick_icon} className="inline-icon" />
        建筑玩家</p>
      <p>
        <img src={fishing_rod_icon} className="inline-icon" />
        养老党, 或是
        <img src={pickaxe_icon} className="inline-icon" />
        新手</p>
      <p>都能找到志同道合的伙伴</p>
      <p>或是只想在群里吹水</p>
      <p>We welcome everyone with good manners!🎉</p>
    </section>
  )
}

export default AboutInfo;