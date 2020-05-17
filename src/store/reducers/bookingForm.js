import * as actionTypes from '../actions/actionTypes';

const initialState = {
  controls: {
    date: {
      config: {
        type: "date",
        label: "Date",
        placeholder: "0",
        id: "date",
        min: ''
      },
      value: '',
    },
    time: {
      config: {
        type: "select",
        label: "Time",
        placeholder: "Select a time",
        id: "time",
        disabled: true,
        options: [
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
      },
      value: '12:00',
    },
    personsNumber: {
      config: {
        type: "number",
        label: "Number of persons (max 10)",
        placeholder: "Select first a date and time",
        id: "personsNumber",
        min: 1,
        max: 10,
        disabled: false
      },
      validation: {
        required: true,
        minValue: 1,
        maxValue: 10
      },
      value: 1,
      valid: true
    },
    name: {
      config: {
        type: "text",
        label: "First name and last name",
        placeholder: "First name and last name",
        id: "name"
      },
      value: '',
    },
    phone: {
      config: {
        type: "tel",
        label: "Phone",
        placeholder: "06 64 50 27 70",
        id: "phone",
      },
      value: ''
    },
    email: {
      config: {
        type: "email",
        label: "Email",
        placeholder: "example@domain.com",
        id: "email",
      },
      value: ''
    }
  },
  formSent: false,
  message: null,
  loading: false
};


const getTodayDate = (state, action) => {
  return {
    ...state,
    controls: {
      ...state.controls,
      date: {
        ...state.controls.date,
        config: {
          ...state.controls.date.config,
          min: action.date
        }
      }
    }
  }
}

const inputChangedHandlerFirstStep = (state, action) => {

  if(action.formElement.id === 'date') {
    if(action.value !== '') {
      return {
        ...state, 
        controls: {
          ...state.controls,
          'time': {
            config: {
              ...state.controls.time.config,
              disabled: false
            }
          },
          [action.formElement.id]: {
            ...action.formElement.config,
            value: action.value
          }
        }
      }
    }
    else {
      return {
        ...state, 
        controls: {
          ...state.controls,
          'time': {
            config: {
              ...state.controls.time.config,
              disabled: true
            }
          },
          [action.formElement.id]: {
            ...action.formElement.config,
            value: action.value
          }
        }
      }
    }

  }
  else {
    return {
      ...state, 
      controls: {
        ...state.controls,
        [action.formElement.id]: {
          ...action.formElement.config,
          value: action.value
        }
      }
    }
  }

}

const disableTimeSlot = (state, action) => {
  return {
    ...state,
    controls: {
      ...state.controls,
      time: {
        ...state.controls.time, 
        config: {
          ...state.controls.time.config,
          options: state.controls.time.config.options.map(timeSlot => {
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
    }
  }
}

const enableTimeSlot = (state, action) => {
  return {
    ...state,
    controls: {
      ...state.controls,
      time: {
        ...state.controls.time, 
        config: {
          ...state.controls.time.config,
          options: state.controls.time.config.options.map(timeSlot => {
            return {
              ...timeSlot,
              disabled: false
            }

          })
        }
      }
    }
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_TODAY_DATE: return getTodayDate(state, action);
    case actionTypes.INPUT_CHANGED_HANDLER_FIRST_STEP: return inputChangedHandlerFirstStep(state, action);
    case actionTypes.DISABLE_TIMESLOT: return disableTimeSlot(state, action);
    case actionTypes.ENABLE_TIMESLOT: return enableTimeSlot(state, action);
    default: return state;
  }
}

export default reducer;