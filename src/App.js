import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './containers/Home/Home';
import About from './containers/About/About';
import Menu from './containers/Menu/Menu';
import SeeBookings from './containers/Bookings/SeeBookings/SeeBookings';
import AddBooking from './containers/Bookings/AddBooking/AddBooking';
import Admin from './containers/Admin/Admin';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

import './scss/import.scss';

class App extends Component {

  state = {
    authIsChecked: false,
  }

  componentDidMount() {
    //Try to reconnect the user to get a persistant session
    this.props.onTryAutoSignup();
    this.setState({authIsChecked: true});
  }


  render() {
    if (!this.state.authIsChecked) {
      //The first time App.js runs, the user is not authenticated so we use a local state
      //to block the rest of render and we wait the reducer switch props isAuthenticated from false to true
      return null;
    }

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />   
        <Route path="/about" component={About} />
        <Route path="/menu" component={Menu} />
        <Route path="/booking" component={AddBooking} /> 
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/menu" component={Menu} />
          <Route path="/booking" component={AddBooking} />
          <Route path="/admin" component={Admin} />
          <Route path="/see-bookings" exact component={SeeBookings} />
          <Route path="/add-booking" exact component={AddBooking} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />   
          <Route path="/" exact component={Home} />
        </Switch>
      );
    }

    return (
      <React.Fragment>
        {routes}
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
