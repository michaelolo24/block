import React from 'react';
import BlockImage from '../../assets/block-image.jpg';
import './not-found.scss';

const NotFound = () => (
  <div className="block-not-found">
    <img src={BlockImage} alt="Not Found" />
  </div>
);

export default NotFound;