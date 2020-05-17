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

export const displayNoDataFoundMessage = () => {
  return {
    type: actionTypes.DISPLAY_NO_DATA_FOUND_MESSAGE
  }
}

export const failFetchBookingsList = () => {
  return {
    type: actionTypes.FAIL_FETCH_BOOKINGS_LIST
  };
};


//get the bookings from realtime database
export const fetchBookingsList = (date) => {
  return dispatch => {
    dispatch(startFetchBookingsList());
    axios.get('/bookings/' + date + '.json')
    .then(response => {

      if(response.data !== null) {
        const fetchedBookings = [];
        for(let date in response.data) {
          fetchedBookings.push({
            ...response.data[date],
            id: date
          })
        }
        dispatch(successFetchBookingsList(fetchedBookings)); //dispatch SUCCESS
      }
      else {
        dispatch(displayNoDataFoundMessage())
      }
      
    })
    .catch(error => {
      dispatch(failFetchBookingsList(error))
    })
  }
};



export const startFetchLocallyBookingsList = () => {
  return {
    type: actionTypes.START_FETCH_LOCALLY_BOOKINGS_LIST
  };
};

export const fetchLocallyBookingsList = (bookingsList, status = 'pending') => {

  console.log(bookingsList);

  let sortedBookingsList = bookingsList.filter(booking => {
    return booking.status === status
  });

  return dispatch => {
    dispatch(startFetchLocallyBookingsList());

    if(sortedBookingsList !== null || sortedBookingsList !== undefined) {
      dispatch(successFetchLocallyBookingsList(sortedBookingsList));
    }
    else {
      dispatch(failFetchBookingsList())
    }
  }
};

export const successFetchLocallyBookingsList = (sortedBookingsList) => {
  return {
    type: actionTypes.SUCCESS_FETCH_LOCALLY_BOOKINGS_LIST,
    sortedBookingsList
  };
};







export const initUpdateBooking = (updatingBooking, indexUpdatingBooking, newStatusUpdatingBooking) => {
  return {
    type: actionTypes.INIT_UPDATE_BOOKING,
    updatingBooking,
    indexUpdatingBooking,
    newStatusUpdatingBooking
  }
}

export const startUpdateBooking = () => {
  return {
    type: actionTypes.START_UPDATE_BOOKING
  };
};

export const successUpdateBooking = (updatedBooking) => {
  return {
    type: actionTypes.SUCCESS_UPDATE_BOOKING,
    updatedBooking
  };
};

export const resetSuccessMessage = () => {
  return {
    type: actionTypes.RESET_SUCCESS_MESSAGE
  }
}

export const failUpdateBooking = () => {
  return {
    type: actionTypes.FAIL_UPDATE_BOOKING
  };
};

export const resetUpdateBooking = () => {
  return {
    type: actionTypes.RESET_UPDATE_BOOKING
  }
}

export const updateBooking = (bookingsList, updatedBooking, selectedTab) => {

  for(let i=0;i<bookingsList.length;i++) {
    if(bookingsList[i].id === updatedBooking.id) {
      bookingsList[i].status = updatedBooking.newStatus
    }
  }

  return dispatch => {
    dispatch(startUpdateBooking());
    axios.put('/bookings/' + updatedBooking.id + '/status.json', JSON.stringify(updatedBooking.newStatus))
    .then(response => {
      dispatch(successUpdateBooking(updatedBooking));
      dispatch(fetchLocallyBookingsList(bookingsList, selectedTab));
      dispatch(resetUpdateBooking());
      setTimeout(() => {
        dispatch(resetSuccessMessage());
      }, 7000)
      
    })
    .catch(error => {
      dispatch(failUpdateBooking());
      dispatch(resetUpdateBooking());
    })
  }
};