import * as actionTypes from '../actions/actionTypes';

const initialState = {
  bookingsList: [],
  loading: false,
  error: false,
  timeSlots: [
    {value: '12:00', displayValue: '12:00', disabled: false},
    {value: '12:30', displayValue: '12:30', disabled: false},
    {value: '13:00', displayValue: '13:00', disabled: false},
    {value: '13:30', displayValue: '13:30', disabled: false},
    {value: '19:00', displayValue: '19:00', disabled: false},
    {value: '19:30', displayValue: '19:30', disabled: false},
    {value: '20:00', displayValue: '20:00', disabled: false},
    {value: '20:30', displayValue: '20:30', disabled: false},
    {value: '21:00', displayValue: '21:00', disabled: false},
  ]
}


const startFetchBookingsListForUser = (state, action) => {
  return {
    ...state,
    loading: true
  }
};

const fetchBookingsListForUser = (state, action) => {
  return {
    ...state,
    loading: false
  }
};

const successFetchBookingsListForUser = (state, action) => {
  return {
    ...state,
    loading: false,
    bookingsList: action.bookingsList
  }
};

const failFetchBookingsListForUser = (state, action) => {
  return {
    ...state,
    loading: false
  }
};

const fetchBookingsListForUserByDate = (state, action) => {
  return {
    ...state
  }
}

const updateTimeSlots = (state, action) => {
  return {
    ...state,
    loading: false,
    timeSlots: state.timeSlots.map(timeSlot => {
      if (timeSlot.value === action.timeSlot) {
        return {
          ...timeSlot,
          disabled: action.disabled
        }
      }
      return timeSlot;
    })
  }
}

const resetTimeSlots = (state, action) => {
  return {
    ...state,
    loading: false,
    timeSlots: state.timeSlots.map(timeSlot => {
      return {
        ...timeSlot,
        disabled: false
      }
    })
  }
}


const checkTotalPersonsNumber = (state, action) => {
  return {
    ...state
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_FETCH_BOOKINGS_LIST_FOR_USER: return startFetchBookingsListForUser(state, action);
    case actionTypes.FETCH_BOOKINGS_LIST_FOR_USER: return fetchBookingsListForUser(state, action);
    case actionTypes.SUCCESS_FETCH_BOOKINGS_LIST_FOR_USER: return successFetchBookingsListForUser(state, action);
    case actionTypes.FAIL_FETCH_BOOKINGS_LIST_FOR_USER: return failFetchBookingsListForUser(state, action);
    case actionTypes.FETCH_BOOKINGS_LIST_FOR_USER_BY_DATE: return fetchBookingsListForUserByDate(state, action);
    case actionTypes.CHECK_TOTAL_PERSONS_NUMBER: return checkTotalPersonsNumber(state, action);
    case actionTypes.UPDATE_TIMESLOTS: return updateTimeSlots(state, action);
    case actionTypes.RESET_TIMESLOTS: return resetTimeSlots(state, action);
    default: return state;
  }
}

export default reducer;