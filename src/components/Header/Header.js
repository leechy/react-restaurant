import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import Logo from '../../assets/images/logo.png';
import './Header.scss';

const Header = (props) => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to='/' className="header__logo"><img src={Logo} alt="" /></Link>
        <Navigation className={props.className}/>
      </div>
    </header>
  );
};

export default Header;