import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../hoc/Layout/Layout';
import Spinner from '../../../components/UI/Spinner/Spinner';
import BookingItem from '../../../components/BookingItem/BookingItem';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';

import * as actions from '../../../store/actions/index'

class SeeBookings extends Component {

  state = {
    startAcceptBooking: false,
    acceptedBooking: false,
    selectedBooking: {}
  }

  componentDidMount() {
    this.props.onFetchBookingsList();
  }

  startAcceptBooking = (booking, index) => {
    this.setState({
      startAcceptBooking: true,
      selectedBooking: booking
    });
  }

  render() {
    let bookingsList = <Spinner />;

    if(!this.props.loading) {
      bookingsList = this.props.bookingsList.map((key, index) => {
        return (
          <BookingItem 
            key={key.id}
            date={key.date} 
            personsNumber={key.personsNumber} 
            time={key.time} 
            email={key.email} 
            phone={key.phone} 
            acceptBooking={() => this.startAcceptBooking(key, index)}
          />
        );
      });
    }

    return (
      <Layout currentPathname={this.props.location.pathname}>
        <div className="content">
          <div className="wrapper">
            <h1>See bookings</h1>
            {bookingsList}

            <Modal show={this.state.startAcceptBooking} >
              Are you sure you want to accept this booking ? 
              <Button class="btn -primary" label="yes" clicked={() => this.props.onUpdateBooking(this.state.selectedBooking, true)} />
            </Modal>
          </div>
        </div>
      </Layout>
    );
  }
};


//mapStateToProps allows us to use data from the global state in the component, it's not a local state anymore
const mapStateToProps = state => {
  return {
    loading: state.bookings.loading,
    bookingsList: state.bookings.bookingsList
  }
};

//mapDispatchToProps allows us to dispatch actions to the store, it will triggers a state change
//the dispatch function is attached to a function and when this function is called it dispatch action
const mapDispatchToProps = dispatch => {
  return {
    onFetchBookingsList: () => dispatch(actions.fetchBookingsList()),
    onUpdateBooking: (updatedBooking, accept) => dispatch(actions.updateBooking(updatedBooking, accept))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SeeBookings);