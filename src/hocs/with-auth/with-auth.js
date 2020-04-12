import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AuthorizationStatus} from "../../reducer/user/user";

const withAuth = (OriginalComponent) => {
  class WithAuth extends Component {
    render() {
      const {authorizationStatus} = this.props;
      if (authorizationStatus !== AuthorizationStatus.AUTH) {
        return <Redirect to='/login'/>;
      }
      return (<OriginalComponent {...this.props} {...this.state}/>);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      console.log(`render withAuth`);
    }
  }

  const mapStateToProps = (state) => ({
    authorizationStatus: state.user.authorizationStatus,
  });

  return connect(mapStateToProps)(WithAuth);
};

export default withAuth;
