import React from 'react';
import '../css/ImageTextBlock.css'

interface ImageTextBlockProps {
  imageSrc: string;
  text: string | string[]; // 支持单行字符串或字符串数组
  imageOnRight?: boolean; // 图片是否在右侧, 默认为 false
}

const ImageTextBlock: React.FC<ImageTextBlockProps> = ({
  imageSrc,
  text,
  imageOnRight = false
}) => {
  const renderText = () => {
    if (typeof text === 'string') {
      return <p>{text}</p>
    } else {
      return text.map((line, index) => 
        <p key={index}>{line}</p>
      )
    }
  };

  return (
    <div className={`image-text-block ${imageOnRight ? 'image-right' : 'image-left'}`}>
      <div className="image-section">
        <img src={imageSrc} alt="Illustration" />
      </div>
      <div className="text-section">
        {renderText()}
      </div>
    </div>
  );
};

export default ImageTextBlock;