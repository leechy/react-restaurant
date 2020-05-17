import * as actionTypes from '../actions/actionTypes';

const initialState = {
  bookingsList: [],
  //sortedBookingsList: null,
  loading: false,
  error: false,
  showModal: false,
  successMessage: null,
  noDataFoundMessage: null,
  updatingBooking: {} 
};

const startFetchBookingsList = (state, action) => {
  return {
    ...state,
    loading: true
  }
}

const successFetchBookingsList = (state, action) => {
  return {
    ...state,
    bookingsList: action.bookingsList,
    loading: false
  }
}

const displayNoDataFoundMessage = (state, action) => {
  return {
    ...state,
    noDataFoundMessage: true,
    loading: false
  }
}





const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_FETCH_BOOKINGS_LIST: return startFetchBookingsList(state, action);
    case actionTypes.SUCCESS_FETCH_BOOKINGS_LIST: return successFetchBookingsList(state, action);
    case actionTypes.DISPLAY_NO_DATA_FOUND_MESSAGE: return displayNoDataFoundMessage(state, action);
    default: return state;
  }
}

export default reducer;