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
import BalloonsScene from './components/BalloonsScene';

import img1 from './assets/group_assests/IMG_4261.png';
import img2 from './assets/group_assests/IMG_4262.png';

function App() {

  return (
    <div className="main-container">
      <OpenGraph />
      <Navbar />
      <div className="content-container">
        <AboutInfo />
        <ScrollingCarousel />
        <Carousel />
        <ImageTextBlock
          imageSrc={img1}
          text="这是一个图文组件"
        />
        <ImageTextBlock
          imageSrc={img2}
          text="这是一个方向相反的图文组件"
          imageOnRight={true}
        />
        <BalloonsScene />
        <JoinUs />
      </div>
      <BackToTop />
      <Footer />
    </div>
  )
}

export default App;
