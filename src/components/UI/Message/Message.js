import React from 'react';

import './Message.scss';

const Message = (props) => {
  return (
    <div className={"message -" + props.type}>
      {props.text}
    </div>
  );
};

export default Message;