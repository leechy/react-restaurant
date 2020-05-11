import * as actionTypes from './actionTypes';
import axios from '../../axios-bookings';


export const startFetchBookingsList = () => {
  return {
    type: actionTypes.START_FETCH_BOOKINGS_LIST
  };
};

export const successFetchBookingsList = (bookingsList) => {
  return {
    type: actionTypes.SUCCESS_FETCH_BOOKINGS_LIST,
    bookingsList
  };
};

export const updateBooking = (updatedBooking, accept) => {
  return {
    type: actionTypes.UPDATE_BOOKING,
    updatedBooking,
    accept
  };
};

export const failFetchBookingsList = () => {
  return {
    type: actionTypes.FAIL_FETCH_BOOKINGS_LIST
  };
};


export const fetchBookingsList = () => {
  return dispatch => {
    dispatch(startFetchBookingsList());
    axios.get('/bookings.json')
    .then(response => {
      //we transform the response.data which is an object into an array
      const fetchedBookings = [];
      for(let booking in response.data) {
        fetchedBookings.push({
          ...response.data[booking],
          id: booking
        })
      }
      dispatch(successFetchBookingsList(fetchedBookings))
    })
    .catch(error => {
      console.log(error)
      dispatch(failFetchBookingsList(error))
    })
  }
};