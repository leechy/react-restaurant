import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import './Navigation.scss';

const Navigation = (props) => {

  let nav = (
    <ul>
      <li><NavLink to='/' exact>Home</NavLink></li>
      <li><NavLink to='/about'>About us</NavLink></li>
      <li><NavLink to='/menu'>Our menu</NavLink></li>
      <li><NavLink to='/booking' exact>Booking</NavLink></li>
      <li><NavLink to='/auth' exact>Auth</NavLink></li>
    </ul>
  );

  if(props.isAuthenticated) {
    nav = (
      <ul>
        <li><NavLink to='/admin'>admin</NavLink></li>
        <li><NavLink to='/logout' exact>Logout</NavLink></li>
      </ul>
    );
  }

  return (
    <nav className={props.className}>
      {nav}
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Navigation);