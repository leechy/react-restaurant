import * as actionTypes from './actionTypes';
import * as actions from './index';


export const startChangeTab = (selectedTab) => {
  return {
    type: actionTypes.START_CHANGE_TAB,
    selectedTab
  }
}

export const changeTab = (bookingsList, selectedTab) => {
  return dispatch => { 
    dispatch(actions.startChangeTab(selectedTab));
   // dispatch(actions.fetchLocallyBookingsList(bookingsList, selectedTab));
  }
};
