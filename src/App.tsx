import './App.css';
import OpenGraph from './components/OpenGraph';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import JoinUs from './components/JoinUs';
import Carousel from './components/Carousel';

function App() {

  return (
    <div className="main-container">
      <OpenGraph />
      <Navbar />
      <div className="content-container">
        <Carousel />
        <JoinUs />
      </div>
      <BackToTop />
      <Footer />
    </div>
  )
}

export default App;
