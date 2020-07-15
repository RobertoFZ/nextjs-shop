import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

const ZoomedImage = ({ image, mobile = false }: { image?: string, mobile?: boolean }) => {
  const src = image ? `${process.env.serverUrl}${image}` : '/logo.png';
  return (
    <div className="zoom">
      <ReactImageMagnify {...{
        isActivatedOnTouch: true,
        enlargedImageContainerClassName: 'zoom__large_image',
        enlargedImageClassName: 'zoom__large_preview',
        smallImage: {
          alt: '',
          isFluidWidth: !mobile,
          src: src
        },
        largeImage: {
          src: src,
          width: mobile ? 400 : 700,
          height: mobile ? 400 : 700
        }
      }} />
    </div>
  )
};

export default ZoomedImage;
