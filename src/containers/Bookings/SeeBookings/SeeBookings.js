import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../../../hoc/Layout/Layout';
import Spinner from '../../../components/UI/Spinner/Spinner';
import BookingItem from '../../../components/BookingItem/BookingItem';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import Message from '../../../components/UI/Message/Message';

import * as actions from '../../../store/actions/index'

import './SeeBookings.scss';


class SeeBookings extends Component {

  componentDidMount() { 
    //When component is loaded, we fetch bookings from firestore
    this.props.onFetchBookingsList("2020-05-13");
  }

  getTodayDate() {
    return new Date().toISOString().substr(0, 10);
  }

  render() {
    //@Andrey: To many renders, I guess component is rendered everytime an action is dispatched.
    // I tried to use shouldComponentUpdate() and indeed the component was rendered only one time but
    // this.props was not updated and everything was broken
    console.log('ici')

    //by default, bookingsList is a spinner and when data is fetched, bookingsList is a list of bookings
    let bookingsList = <Spinner />;
    let modalContent = null;
    let successMessage = null;
    let noDataFoundMessage = null;

    /*if(this.props.updatingBooking.newStatus === 'accepted') {
      modalContent = (
        <React.Fragment>
          Are you sure you want to accept this booking ? <br />
          <Button class="btn -primary" label="yes" clicked={() => this.props.onUpdateBooking(this.props.bookingsList, this.props.updatingBooking, this.props.selectedTab)} />
          <Button class="btn -primary" label="cancel" clicked={() => this.props.onResetUpdateBooking()}/>
        </React.Fragment>
      );
    }
    else if(this.props.updatingBooking.newStatus === 'declined') {
      modalContent = (
        <React.Fragment>
          Are you sure you want to decline this booking ? <br />
          <Button class="btn -primary" label="yes" clicked={() => this.props.onUpdateBooking(this.props.bookingsList, this.props.updatingBooking, this.props.selectedTab)} />
          <Button class="btn -primary" label="cancel" clicked={() => this.props.onResetUpdateBooking()} />
        </React.Fragment>
      );
    }*/

    if(!this.props.loading && !this.props.noDataFoundMessage) {

      //@Andrey : Is there a better way or easier way to fetch my bookingsList ?
      var displayingDate = '';
      bookingsList = this.props.bookingsList
        .map((bookingTime, i) => (
          <div key={i}>
            { displayingDate !== bookingTime.date &&
              (displayingDate = bookingTime.date) &&
              <h1>{bookingTime.date}</h1>
            }
            <h2>{bookingTime.date} {bookingTime.id}</h2>
            { Object.keys(bookingTime)
                .filter(bookingId => bookingTime[bookingId].status)
                .map(bookingId => (
                  <BookingItem key={bookingId} {...bookingTime[bookingId]}>
                    <div className="bookingItem__column">
                      {/*<Button label="Accept" class="btn -primary -accept" clicked={() => this.props.onInitUpdateBooking(booking, index, 'accepted')} />
                      <Button label="Decline" class="btn -primary -decline" clicked={() => this.props.onInitUpdateBooking(booking, index, 'declined')} />*/ }
                    </div>
                  </BookingItem>
                ))
            }
          </div>
        ))
    } else {
      bookingsList = null;
    }

    return (
      <Layout currentPathname={this.props.location.pathname}>
        <div className="content">
          <div className="wrapper">
            <h1>See bookings</h1>
            {
              this.props.successMessage 
              ? successMessage = <Message type="success" text={`The booking ID: ${this.props.successMessage.id} has been ${this.props.successMessage.newStatus}`} />
              : successMessage = null
            }

            {
              this.props.noDataFoundMessage 
              ? noDataFoundMessage = <Message type="error" text='There is no bookings for the current date' />
              : noDataFoundMessage = null
            }

            {bookingsList}
  
            <Modal show={this.props.showModal} >
              {modalContent}
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
    auth: state.auth,
    loading: state.bookings.loading,
    bookingsList: state.bookings.bookingsList,
    showModal: state.bookings.showModal,
    //sortedBookingsList: state.bookings.sortedBookingsList,
    updatingBooking: state.bookings.updatingBooking,
    //selectedTab: state.tabs.selectedTab,
    successMessage: state.bookings.successMessage,
    noDataFoundMessage: state.bookings.noDataFoundMessage !== null
  }
};

//mapDispatchToProps allows us to dispatch actions to the store, it will triggers a state change
//the dispatch function is attached to a function and when this function is called it dispatch action
const mapDispatchToProps = dispatch => {
  return {
    onFetchBookingsList: (date) => dispatch(actions.fetchBookingsList(date)),
    //onInitUpdateBooking: (updatingBooking, indexUpdatingBooking, newStatusUpdatingBooking) => dispatch(actions.initUpdateBooking(updatingBooking, indexUpdatingBooking, newStatusUpdatingBooking)),
    //onResetUpdateBooking: () => dispatch(actions.resetUpdateBooking()),
    //onUpdateBooking: (bookingsList, updatedBooking, selectedTab) => dispatch(actions.updateBooking(bookingsList, updatedBooking,selectedTab)),
    //onChangeTab: (bookingsList, selectedTab) => dispatch(actions.changeTab(bookingsList, selectedTab))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SeeBookings);