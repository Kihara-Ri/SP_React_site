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
      <img src={imageSrc} alt="图文组件图片" className="image" />
      <div className="text">{text}</div>
    </div>
  );
};

export default ImageTextBlock;