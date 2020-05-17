import * as actionTypes from './actionTypes';
import axios from '../../axios-bookings';
import * as actions from './index';


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

export const failFetchBookingsList = () => {
  return {
    type: actionTypes.FAIL_FETCH_BOOKINGS_LIST
  };
};

export const displayNoDataFoundMessage = () => {
  return {
    type: actionTypes.DISPLAY_NO_DATA_FOUND_MESSAGE
  }
}


//get the bookings from realtime database
export const fetchBookingsList = (date) => {
  return dispatch => {

    let url = date === undefined ? '/bookings.json' : '/bookings/' + date + '.json';
    

    dispatch(startFetchBookingsList());
    axios.get(url)
    .then(response => {
      if(response.data !== null) {
        const fetchedBookings = [];
        
        for(let booking in response.data) {
          
          fetchedBookings.push({
            ...response.data[booking],
            id: booking,
            date: date
          })
        }

        dispatch(successFetchBookingsList(fetchedBookings)); //dispatch SUCCESS
      }
      else {
        dispatch(displayNoDataFoundMessage());
        dispatch(successFetchBookingsList(null)); //dispatch SUCCESS
        
      }
    })
    .catch(error => {
      dispatch(failFetchBookingsList(error))
    })
  }
};

export const fetchBookingsByDate = date => {
  return dispatch => {
    
    dispatch(startFetchBookingsList());// Display spinner

    axios.get('/bookings/' + date + '.json')
    .then(response => {
      //If the date selected by user contains some bookings
      if(response.data !== null) {
        const fetchBookings = [];
        let totalPersonsNumberByTimeSlot = 0;

        //we create an array of bookings
        for(let booking in response.data) {
          for(let i=0;i<Object.values(response.data[booking]).length;i++) {
            totalPersonsNumberByTimeSlot += parseInt(Object.values(response.data[booking])[i].personsNumber);
          }

          fetchBookings.push({
            ...response.data[booking],
            id: booking,
            totalPersonsNumber: totalPersonsNumberByTimeSlot
          })

          totalPersonsNumberByTimeSlot = 0;
          dispatch(checkTotalPersonsNumber(null, fetchBookings)); //we check the amount of persons by timeslot for the given date and disable some timeslot if necessary
        }

        dispatch(actions.enableTimeSlot()); //we enable all timeslots for the new date selected
      }
      else {
        dispatch(actions.enableTimeSlot());
        dispatch(successFetchBookingsList(null)); 
      }
    })
    .catch(error => {
      console.log(error)
      dispatch(failFetchBookingsList(error))
    })
  }
};






//Here, we want to check the total amount of persons by timeslot (12:00,12:30,...) for a given date
//If the total amount >= 10 so we disable the timeslot to avoid adding more bookings
export const checkTotalPersonsNumber = (personsNumber, bookingsList) => {
  return dispatch => {
    const totalPersonsNumber = [];
    const timeSlot = [];

    for(let i=0;i<bookingsList.length;i++) {
      totalPersonsNumber.push(bookingsList[i].totalPersonsNumber);
      timeSlot.push(bookingsList[i].id);
    }

    //We check if there is more than 10 people for each timeslot, if there is more than 10, we disable the timeslot to avoid getting more people
    for(let i=0;i<timeSlot.length;i++) {
      if(totalPersonsNumber[i] >= 10) {
        dispatch(actions.disableTimeSlot(timeSlot[i], true));
      }
    }

    dispatch(successFetchBookingsList(bookingsList))
  }
};










