import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import validator from 'validator';
import './image-element.scss';

const ImageElement = ({ imageUrl }) => {
  const [isZoomed, updateIsZoomed] = useState(false);

  const imageContainerClassName = classNames('image-element', {
    'image-element--zoomed': isZoomed
  });

  const toggleZoom = () => updateIsZoomed(!isZoomed);

  return (
    <div className={imageContainerClassName}>
      <div className="image-element__wrapper">
        { imageUrl && validator.isURL(imageUrl) && (
          <button onClick={toggleZoom} type="button">
            <img alt="block-media" src={imageUrl} />
          </button>
        )}
      </div>
    </div>
  );
};

ImageElement.defaultProps = {
  imageUrl: null
};

ImageElement.propTypes = {
  imageUrl: PropTypes.string
};

export default ImageElement;