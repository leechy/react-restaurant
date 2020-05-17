import * as actionTypes from '../actions/actionTypes';


const initialState = {
  selectedTab: 'pending'
}

const startChangeTab = (state, action) => {
  return {
    ...state,
    selectedTab: action.selectedTab
  }
}

const changeTab = (state, action) => {
  return {
    ...state,
    selectedTab: action.selectedTab
  }
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_TAB: return changeTab(state, action);
    case actionTypes.START_CHANGE_TAB: return startChangeTab(state, action)
    default: return state;
  }
}

export default reducer;