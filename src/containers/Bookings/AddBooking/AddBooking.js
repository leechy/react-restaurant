import React, { Component } from 'react';
import axios from '../../../axios-bookings';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Message from '../../../components/UI/Message/Message';

import Layout from '../../../hoc/Layout/Layout';

import './AddBooking.scss';

class AddBooking extends Component {
  state = {
    bookingForm: {
      personsNumber: {
        config: {
          type: "number",
          label: "Number of persons (max 20)",
          placeholder: "1",
          id: "numberPersons",
          min: 1,
          max: 20
        },
        validation: {
          required: true,
          minValue: 1,
          maxValue: 20
        },
        value: 1,
        valid: true
      },
      date: {
        config: {
          type: "date",
          label: "Date",
          placeholder: "0",
          id: "date",
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
          placeholder: "14:00",
          id: "time",
          options: [
            {value: '12:00', displayValue: '12:00'},
            {value: '12:30', displayValue: '12:30'},
            {value: '13:00', displayValue: '13:00'},
            {value: '13:30', displayValue: '13:30'},
            {value: '19:00', displayValue: '19:00'},
            {value: '19:30', displayValue: '19:30'},
            {value: '20:00', displayValue: '20:00'},
            {value: '20:30', displayValue: '20:30'},
            {value: '21:00', displayValue: '21:00'}
          ]
        },
        validation: {
          required: true
        },
        value: '12:00',
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
    formSent: false
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
      accepted: false
    }

    axios.post('/bookings.json', booking)
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

export default AddBooking;