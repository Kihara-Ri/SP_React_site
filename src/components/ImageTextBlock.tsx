import React from 'react';
import '../css/ImageTextBlock.css'

interface ImageTextBlockProps {
  imageSrc: string;
  text: string;
  imageOnRight?: boolean; // 图片是否在右侧, 默认为 false
}

const ImageTextBlock: React.FC<ImageTextBlockProps> = ({
  imageSrc,
  text,
  imageOnRight = false
}) => {
  return (
    <div className={`image-text-block ${imageOnRight ? 'image-right' : 'image-left'}`}>
      <div className="image-section">
        <img src={imageSrc} alt="Illustration" />
      </div>
      <div className="text-section">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ImageTextBlock;