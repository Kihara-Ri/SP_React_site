import React from 'react';

interface imageOptions {
  imageSrc: string[];
  autoPlay?: boolean; 
  control?: boolean;
}

const SlideImage:React.FC<imageOptions> = ({
  imageSrc,
  autoPlay = true,
  control = true
}) => {
  return (
    <div></div>
  )
}

export default SlideImage;