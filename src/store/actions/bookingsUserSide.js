import * as actionTypes from './actionTypes';
import axios from '../../axios-bookings';

export const startFetchBookingsListForUser = () => {
  return {
    type: actionTypes.START_FETCH_BOOKINGS_LIST_FOR_USER
  };
};

export const successFetchBookingsListForUser = (bookingsList) => {
  return {
    type: actionTypes.SUCCESS_FETCH_BOOKINGS_LIST_FOR_USER,
    bookingsList
  };
};

export const failFetchBookingsListForUser = () => {
  return {
    type: actionTypes.FAIL_FETCH_BOOKINGS_LIST_FOR_USER
  };
};

export const resetTimeSlots = () => {
  return {
    type: actionTypes.RESET_TIMESLOTS
  };
};


//get the bookings from realtime database
export const fetchBookingsListForUser = () => {
  return dispatch => {
    dispatch(startFetchBookingsListForUser());
    axios.get('/bookings.json')
    .then(response => {
      const fetchedBookings = [];
      for(let booking in response.data) {
        fetchedBookings.push({
          ...response.data[booking],
          id: booking
        })
      }
      dispatch(successFetchBookingsListForUser(fetchedBookings)); //dispatch SUCCESS
    })
    .catch(error => {
      dispatch(failFetchBookingsListForUser(error))
    })
  }
};

export const updateTimeSlots = (timeSlot, disabled) => {
  return {
    type: actionTypes.UPDATE_TIMESLOTS,
    timeSlot,
    disabled
  }
}


//Here, we want to check the total amount of persons by timeslot (12:00,12:30,...) for a given date
//If the total amount >= 2 so we disable the timeslot to avoid adding more bookings
export const checkTotalPersonsNumber = (personsNumber, bookingsList) => {
  return dispatch => {

    const totalPersonsNumber = [];
    const timeSlot = []

    for(let i=0;i<bookingsList.length;i++) {
      totalPersonsNumber.push(bookingsList[i].totalPersonsNumber);
      timeSlot.push(bookingsList[i].id);
    }

    //We check if there is more than 10 people for each timeslot, if there is more than 10, we disable the timeslot to avoid getting more people
    for(let i=0;i<timeSlot.length;i++) {
      if(totalPersonsNumber[i] >= 10) {
        dispatch(updateTimeSlots(timeSlot[i], true));
      }
      else {
        dispatch(updateTimeSlots(timeSlot[i], false))
      }
    }

    dispatch(successFetchBookingsListForUser(bookingsList))
  }
};

export const checkTimeSlotAvailableSeats = (time, bookingsList) => {
  return dispatch => {
    
  }
};

export const fetchBookingsListForUserByDate = date => {
  return dispatch => {
    
    dispatch(startFetchBookingsListForUser());// Display spinner

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

          console.log(totalPersonsNumberByTimeSlot)

          fetchBookings.push({
            ...response.data[booking],
            id: booking,
            totalPersonsNumber: totalPersonsNumberByTimeSlot
          })

          totalPersonsNumberByTimeSlot = 0;
        }

        //we check the amount of persons by timeslot for the given date
        dispatch(checkTotalPersonsNumber(null, fetchBookings));
      }
      else {
        dispatch(resetTimeSlots())
      }
    })
    .catch(error => {
      console.log(error)
      dispatch(failFetchBookingsListForUser(error))
    })
  }
};