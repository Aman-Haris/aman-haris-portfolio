import React from 'react';

const ImagePlaceholder = ({ text = 'Image' }) => {
  return (
    <div className="image-placeholder">
      <span>{text}</span>
    </div>
  );
};

export default ImagePlaceholder;