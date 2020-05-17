import * as actionTypes from './actionTypes';
import * as actions from './index';


//this action is triggered when component is mounted, to get the today date
export const getTodayDate = date => {
  return {
    type: actionTypes.GET_TODAY_DATE,
    date
  }
}

//this action is triggered everytime a value change in an input
export const inputChangedHandlerFirstStep = (event, formElement) => {
  const value = event.target.value;

  return {
    type: actionTypes.INPUT_CHANGED_HANDLER_FIRST_STEP,
    formElement,
    value
  }
}


//this action is triggered everytime a value change in an input
export const inputChangedHandlerSecondStep = (event, formElement, bookingsList) => {
  return dispatch => {
    dispatch(inputChangedHandlerFirstStep(event, formElement));

    if(event.target.id === 'date') {
      dispatch(actions.fetchBookingsByDate(event.target.value))
    }
    
    if(event.target.id === 'personsNumber' && bookingsList !== null) {
      dispatch(actions.checkTotalPersonsNumber(event.target.value, bookingsList))
    }
  }
}

export const disableTimeSlot = (timeSlot, disabled) => {
  return {
    type: actionTypes.DISABLE_TIMESLOT,
    timeSlot,
    disabled
  }
}

export const enableTimeSlot = (timeSlot, disabled) => {
  return {
    type: actionTypes.ENABLE_TIMESLOT,
    timeSlot,
    disabled
  }
}