import React from 'react';

import Link from '../UI/Link/Link';

import image from '../../assets/images/hero-image.jpg';

import './HeroImage.scss';

const HeroImage = () => { 
  return (
    <div className="heroImage" style={{backgroundImage: `url(${image})`}}>
      <div className="heroImage__content">
        <h1>Welcome to our Bar Restaurant</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        <Link to='/booking' label="Book a table" class="btn -primary" />
      </div>
    </div>
  );
};

export default HeroImage;