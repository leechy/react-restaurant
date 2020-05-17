import * as actionTypes from '../actions/actionTypes';

const initialState = {
  bookingsList: [],
  sortedBookingsList: null,
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



const startFetchLocallyBookingsList = (state, action) => {
  return {
    ...state,
    loading: true
  }
};

const fetchLocallyBookingsList = (state, action) => {
  return {
    ...state,
    loading: false
  }
};

const successFetchLocallyBookingsList = (state, action) => {
  return {
    ...state,
    loading: false,
    sortedBookingsList: action.sortedBookingsList
  }
};

const failFetchBookingsList = (state, action) => {
  return {
    ...state,
    loading: false
  }
};



const initUpdateBooking = (state, action) => {
  return {
    ...state,
    showModal: true,
    updatingBooking: {
      ...action.updatingBooking,
      newStatus: action.newStatusUpdatingBooking,
      index: action.indexUpdatingBooking
    }
  }
};

const startUpdateBooking = (state, action) => {
  return {
    ...state,
    loading: true
  }
};

const successUpdateBooking = (state, action) => {
  return {
    ...state,
    loading: false,
    successMessage: {...action.updatedBooking},
    bookingsList: state.bookingsList.map(booking => {
      if (booking.id === action.updatedBooking.id) {
        return {
          ...booking,
          status: action.updatedBooking.newStatus
        }
      }
      return booking;
    })
  }
};

const failUpdateBooking = (state, action) => {
  return {
    ...state,
    loading: false
  }
};

const resetUpdatedBooking = (state, action) => {
  return {
    ...state,
    showModal: false,
    updatingBooking: {}
  }
}

const resetSuccessMessage = (state, action) => {
  return {
    ...state,
    successMessage: null
  }
}

const displayNoDataFoundMessage = (state, action) => {
  return {
    ...state,
    loading: false,
    noDataFoundMessage: true
  }
}


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_FETCH_BOOKINGS_LIST: return startFetchBookingsList(state, action);
    case actionTypes.FETCH_BOOKINGS_LIST: return fetchBookingsList(state, action);
    case actionTypes.SUCCESS_FETCH_BOOKINGS_LIST: return successFetchBookingsList(state, action);
    case actionTypes.FAIL_FETCH_BOOKINGS_LIST: return failFetchBookingsList(state, action);
    case actionTypes.DISPLAY_NO_DATA_FOUND_MESSAGE: return displayNoDataFoundMessage(state, action);

    case actionTypes.START_FETCH_LOCALLY_BOOKINGS_LIST: return startFetchLocallyBookingsList(state, action);
    case actionTypes.FETCH_LOCALLY_BOOKINGS_LIST: return fetchLocallyBookingsList(state, action);
    case actionTypes.SUCCESS_FETCH_LOCALLY_BOOKINGS_LIST: return successFetchLocallyBookingsList(state, action);

    case actionTypes.INIT_UPDATE_BOOKING: return initUpdateBooking(state, action);
    case actionTypes.START_UPDATE_BOOKING: return startUpdateBooking(state, action);
    case actionTypes.SUCCESS_UPDATE_BOOKING: return successUpdateBooking(state, action);
    case actionTypes.FAIL_UPDATE_BOOKING: return failUpdateBooking(state, action);
    case actionTypes.RESET_UPDATE_BOOKING: return resetUpdatedBooking(state, action);

    case actionTypes.RESET_SUCCESS_MESSAGE: return resetSuccessMessage(state, action);
    default: return state;
  }
}

export default reducer;