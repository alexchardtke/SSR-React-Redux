import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
  class RequireAuth extends Component {
    render() {
      // this.props.auth from our reducer
      switch (this.props.auth) {
        case false:
          // Not logged in
          return <Redirect to="/" />
        case null:
          // Haven't fetched user's auth state yet
          return <div>Loading...</div>
        default:
          // Logged in
          return <ChildComponent {...this.props} />
      }
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
