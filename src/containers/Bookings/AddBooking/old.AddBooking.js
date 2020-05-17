import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-bookings';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Message from '../../../components/UI/Message/Message';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Layout from '../../../hoc/Layout/Layout';

import * as actions from '../../../store/actions/index'

import './AddBooking.scss';

class AddBooking extends Component {
  state = {
    bookingForm: {
      date: {
        config: {
          type: "date",
          label: "Date",
          placeholder: "0",
          id: "date",
          min: this.getTodayDate()
        },
        validation: {
          required: true
        },
        value: '',
        valid: false
      },
      time: {
        config: {
          type: "select",
          label: "Time",
          placeholder: "Select a time",
          id: "time",
          options: this.props.timeSlots
        },
        validation: {
          required: true
        },
        value: '12:00',
        valid: true
      },
      personsNumber: {
        config: {
          type: "number",
          label: "Number of persons (max 10)",
          placeholder: "Select first a date and time",
          id: "personsNumber",
          min: 1,
          max: 10,
          disabled: true
        },
        validation: {
          required: true,
          minValue: 1,
          maxValue: 20
        },
        value: 1,
        valid: true
      },
      name: {
        config: {
          type: "text",
          label: "First name and last name",
          placeholder: "First name and last name",
          id: "name",
        },
        validation: {
          required: true
        },
        value: '',
        valid: false
      },
      phone: {
        config: {
          type: "tel",
          label: "Phone",
          placeholder: "06 64 50 27 70",
          id: "phone",
        },
        validation: {
          required: true
        },
        value: '',
        valid: false
      },
      email: {
        config: {
          type: "email",
          label: "Email",
          placeholder: "example@domain.com",
          id: "email",
        },
        validation: {
          required: true
        },
        value: '',
        valid: false
      }
    },
    formIsValid: false,
    formSent: false,
    message: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timeSlots !== this.props.options) {
      this.setState(prevState => ({
        ...prevState,
        bookingForm: {
          ...prevState.bookingForm,
          time: {
            ...prevState.bookingForm.time,
            config: {
              ...prevState.bookingForm.time.config, 
              options: nextProps.timeSlots
            }
          }
        }
      }))
    }
  }

  componentDidMount() {
    this.props.onFetchBookingsListForUser();
  }

  getTodayDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  } 
  

  checkValidity = (value, rules) => {
    let isValid = true;
  
    if(!rules) {
      return true;
    }
  
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minValue) {
      isValid = value >= rules.minValue && isValid;
    }

    if(rules.maxValue) {
      isValid = value <= rules.maxValue && isValid;
    }
  
    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
  
    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
  
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {

    let formIsValid = true;

    if(inputIdentifier === 'date') {
      this.props.onFetchBookingsListForUserByDate(event.target.value);
    }

    if(inputIdentifier === 'personsNumber') {
      this.props.onCheckTotalPersonsNumber(event.target.value, this.props.bookingsList);
    }

    if(inputIdentifier === 'time') {
      this.props.onCheckTimeSlotAvailableSeats(event.target.value, this.props.bookingsList);
    }

    if(this.state.bookingForm.date.value !== '' && this.state.bookingForm.time.value !== '') {
      this.setState({
        bookingForm: {
          ...this.state.bookingForm,
          personsNumber: {
            ...this.state.bookingForm.personsNumber,
            config: {
              ...this.state.bookingForm.personsNumber.config, 
              disabled: false
            }
          }
        }
      })
    }


    //we create a clone of booking form
    const updatedBookingForm = {
      ...this.state.bookingForm
    }; 

    //we create a clone of each key of booking form (name, email, ....)
    const updatedFormElement = {
      ...updatedBookingForm[inputIdentifier]
    };

    //value of cloned key = event.target.value
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    //we attribute the cloned key updatedFormElement to each key of cloned booking form
    updatedBookingForm[inputIdentifier] = updatedFormElement;
    
    for (let inputIdentifier in updatedBookingForm) {
      formIsValid = updatedBookingForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({bookingForm: updatedBookingForm, formIsValid: formIsValid});
  }


  submitBookingHandler = (event) => {
    event.preventDefault();

    const booking = {
      personsNumber: this.state.bookingForm.personsNumber.value,
      date: this.state.bookingForm.date.value,
      name: this.state.bookingForm.name.value,
      phone: this.state.bookingForm.phone.value,
      email: this.state.bookingForm.email.value,
      time: this.state.bookingForm.time.value,
      status: 'pending'
    }

    axios.post('/bookings/' + booking.date + '/' + booking.time + '.json', booking)
      .then(response => {
        this.setState({formSent: true})
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    //We transform this.state.bookingForm in an array to use map (map is not usable on objects)
    const formElementsArray = [];
    for (let key in this.state.bookingForm) {
      formElementsArray.push({
        id: key,
        config: this.state.bookingForm[key]
      })
    }

    let form = '';
    let successMessage = '';
      

    if(this.state.formSent) {
      form = '';
      successMessage = (<Message type="success" text="Your booking has been sent, we'll analyze your booking and send you an email to confirm it." />);
    }
    else {
      if(this.props.loading) {
        form = <Spinner />
      }
      else {
        form = (
          <form className="bookingForm">
            {
              formElementsArray.map(formElement => {
                return (
                  <Input 
                    key={formElement.id}
                    id={formElement.id}
                    config={formElement.config.config}
                    value={formElement.config.value}
                    valid={formElement.config.valid}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}            
                  />
                );
              })
            }
  
            <Button 
              type="submit" 
              class="btn -primary" 
              label="Submit booking" 
              disabled={!this.state.formIsValid}
              clicked={this.submitBookingHandler} 
            />
          </form>
        );
      }
    }

    return (
      <Layout currentPathname={this.props.location.pathname}>
        <div className="content">
          <div className="wrapper">
            <h1>Booking</h1>
            {form}
            {successMessage}
          </div>
        </div>
      </Layout>
    )
  }
};

const mapStateToProps = state => {
  return {
    bookingsList: state.bookingsUserSide.bookingsList,
    timeSlots: state.bookingsUserSide.timeSlots,
    loading: state.bookingsUserSide.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBookingsListForUser: () => dispatch(actions.fetchBookingsListForUser()),
    onCheckTotalPersonsNumber: (personsNumber, bookingsList) => dispatch(actions.checkTotalPersonsNumber(personsNumber, bookingsList)),
    onCheckTimeSlotAvailableSeats: (time, bookingsList) => dispatch(actions.checkTimeSlotAvailableSeats(time, bookingsList)),
    onFetchBookingsListForUserByDate: (date) => dispatch(actions.fetchBookingsListForUserByDate(date))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBooking);