import React from 'react';
import '../css/Citation.css';
import quotationL from '../assets/icons/quotation-l.svg';

interface CitationProps {
  text: string | string[]
}

const Citation: React.FC<CitationProps> = ({ text }) => {
  const renderQuo = () => {
    if(typeof text === 'string') {
      return <h1>{text}</h1>
    } else {
      return text.map((line, index) => 
        <h1 
          key={index}
          style={{ margin: 0 }}
          className='quo-line'
          >{line}</h1>
      )
    }
  }
  
  return (
    <div className="citation-container">
      {/* 左引号 */}
      <img src={quotationL} alt="left-quote" className="quote-left" />
      {/* 右引号 */}
      <img src={quotationL} alt="right-quote" className="quote-right" />
      {renderQuo()}
    </div>
  )
}

export default Citation;
