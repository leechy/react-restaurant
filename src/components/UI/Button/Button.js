import React from 'react';

const Button = (props) => {
  return (
    <button 
      className={props.class}
      disabled={props.disabled} 
      onClick={props.clicked}
    >
      {props.label}
    </button>
  );
};

export default Button;