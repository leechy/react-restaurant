import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-bookings';

const initialState = {
  bookingsList: [],
  loading: false,
  error: false
};

const startFetchBookingsList = (state, action) => {
  return {
    ...state,
    loading: true
  }
};


const fetchBookingsList = (state, action) => {
  return {
    ...state,
    loading: false
  }
};

const successFetchBookingsList = (state, action) => {
  return {
    ...state,
    loading: false,
    bookingsList: action.bookingsList
  }
};

const failFetchBookingsList = (state, action) => {
  return {
    ...state,
    loading: false
  }
};

const updateBooking = (state, action) => {

  //we create a object which store our muted state.bookingsList


  let updateBooking = action.updatedBooking;
  const updatedBookingId = action.updatedBooking.id;

  console.log(updatedBookingId)


  return {
    ...state,
    bookingsList: {
      ...state.bookingsList,
      [action.updatedBooking.index]: {
        ...state.bookingsList[action.updatedBooking.index],
        accepted: action.accept
      }
    }
  }

  //we transform our muted state object into an array
  /*const bookingsList = [];
  for(let booking in updatedBooking.bookingsList) {
    bookingsList.push({
      ...updatedBooking.bookingsList[booking],
      id: booking
    })
  }*/


  /*axios.put('/bookings.json?id=' + action.updatedBooking.booking.id, booking)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })*/
  

};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_FETCH_BOOKINGS_LIST: return startFetchBookingsList(state, action);
    case actionTypes.FETCH_BOOKINGS_LIST: return fetchBookingsList(state, action);
    case actionTypes.SUCCESS_FETCH_BOOKINGS_LIST: return successFetchBookingsList(state, action);
    case actionTypes.FAIL_FETCH_BOOKINGS_LIST: return failFetchBookingsList(state, action);
    case actionTypes.UPDATE_BOOKING: return updateBooking(state, action);
    default: return state;
  }
}

export default reducer;