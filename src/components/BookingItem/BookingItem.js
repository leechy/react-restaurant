import React from 'react';

import './BookingItem.scss';

const BookingItem = props => {
  return (
    <div className="bookingItem" key={props.id}>
      <div className="bookingItem__column">
        <span className="label">Date</span><br />
        <span>{props.date}</span>
      </div>

      <div className="bookingItem__column">
        <span className="label">Persons</span><br />
        <span>{props.personsNumber}</span>
      </div>

      <div className="bookingItem__column">
        <span className="label">Time</span><br />
        <span>{props.time}</span>
      </div>

      <div className="bookingItem__column">
        <span className="label">Email</span><br />
        <span>{props.email}</span>
      </div>

      <div className="bookingItem__column">
        <span className="label">Phone</span><br />
        <span>{props.phone}</span>
      </div>

      {props.children}

      
    </div>
  );
};

export default BookingItem