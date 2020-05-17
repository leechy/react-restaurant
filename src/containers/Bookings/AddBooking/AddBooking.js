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
    formSent: false
  }

  componentDidMount() {
    this.getTodayDate();
    this.props.onFetchBookingsList();
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

    return this.props.onGetTodayDate([year, month, day].join('-'));
  } 


  submitBookingHandler = (event) => {
    event.preventDefault();

    const booking = {
      personsNumber: this.props.bookingForm.controls.personsNumber.value,
      date: this.props.bookingForm.controls.date.value,
      name: this.props.bookingForm.controls.name.value,
      phone: this.props.bookingForm.controls.phone.value,
      email: this.props.bookingForm.controls.email.value,
      time: this.props.bookingForm.controls.time.value,
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
    for (let key in this.props.bookingForm.controls) {
      formElementsArray.push({
        id: key,
        config: this.props.bookingForm.controls[key]
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
                    changed={(event) => this.props.onInputChangedHandlerSecondStep(event, formElement, this.props.bookingsList)}            
                  />
                );
              })
            }
  
            <Button 
              type="submit" 
              class="btn -primary" 
              label="Submit booking" 
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
    bookingsList: state.bookings.bookingsList,
    timeSlots: state.bookings.timeSlots,
    loading: state.bookings.loading,
    bookingForm: state.bookingForm
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChangedHandlerSecondStep: (event, formElement, bookingsList) => dispatch(actions.inputChangedHandlerSecondStep(event, formElement, bookingsList)),
    onFetchBookingsList: () => dispatch(actions.fetchBookingsList()),
    onGetTodayDate: (date) => dispatch(actions.getTodayDate(date))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBooking);