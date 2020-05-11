import React, { Component } from 'react';

import Layout from '../../hoc/Layout/Layout';
import Link from '../../components/UI/Link/Link'

class Admin extends Component {
  render() {
    return (
      <Layout currentPathname={this.props.location.pathname}>
        <div className="content">
          <div className="wrapper">
            <h1>Admin</h1>
            {this.props.location.pathname}<br />
            <Link label="See bookings" class="btn -primary" to="/see-bookings" />
            <Link label="Add booking" class="btn -primary" to="/add-booking" />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Admin;