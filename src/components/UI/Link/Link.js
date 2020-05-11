import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = (props) => {
  return (
    <NavLink to={props.to} className={props.class}>{props.label}</NavLink>
  );
};

export default Link;