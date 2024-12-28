import './App.css';
import OpenGraph from './components/OpenGraph';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import JoinUs from './components/JoinUs';
import Carousel from './components/Carousel';
import ImageTextBlock from './components/ImageTextBlock';
import AboutInfo from './components/AboutInfo';
import ScrollingCarousel from './components/ScrollingCarousel';
// import BalloonsScene from './components/BalloonsScene';
import Illustrate from './components/Illustrate/Illustrate';
import Citation from './components/Citation';

import Issues from './assets/icons/issues.svg';
import img1 from './assets/group_assests/IMG_4261.png';
import img2 from './assets/group_assests/IMG_4262.png';


function App() {

  return (
    <div className="main-container">
      <OpenGraph />
      <Navbar />
      <div className="content-container">
        <AboutInfo />
        <h1 style={{marginBottom: 0,}}>Freedom to the Fullest</h1>
        <h1 style={{margin: 0}}>做任何你想做的事</h1>
        <ScrollingCarousel />
        <h1 style={{marginBottom: 0}}>Vibrant Community</h1>
        <h1 style={{margin: 0}}>活跃的社区</h1>
        <Carousel />
        <h2 style={{margin: 0}}>觉得无聊?</h2>
        <h2 style={{margin: 0}}>我们会经常举办各种活动</h2>
        <h2 style={{marginTop: 0}}>或者...贴贴</h2>

        <h1 style={{marginBottom: 0, fontSize: '3rem'}}>但是</h1>
        <h1 style={{margin: 0}}>发挥你的才能!</h1>
        <ImageTextBlock
          imageSrc={img1}
          text={[
            "发挥你的创造力",
            "一起建造精美的建筑",
            "构建绝妙的风景",
            "加入我们, 打造无限可能"
          ]}
        />
        <ImageTextBlock
          imageSrc={img2}
          text={[
            "怀着学习的热情",
            "精进红石知识",
            "打造复杂的机器",
            "享受进步的快感"
          ]}
          imageOnRight={true}
        />
        <Citation
          text={[
            "闲来垂钓碧溪上",
            "忽复乘舟梦日边"
          ]}
        />
        <Illustrate />
        {/* <BalloonsScene /> */}
        <JoinUs />
        <div className="more-info">
          <p>如果你有关于本站建设的意见和建议</p>
          <p>请在此处提交 
            <a href="https://github.com/Kihara-Ri/SP_React_site/issues"
            className="issue-a"
            >
            <img src={Issues} alt="issues-icon" className="inline-icon" />
            Issues</a></p>
        </div>
      </div>
      <BackToTop />
      <Footer />
    </div>
  )
}

export default App;
