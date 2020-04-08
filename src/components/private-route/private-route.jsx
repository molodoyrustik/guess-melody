import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducer/user/user.js";

class PrivateRoute extends React.Component {
  render() {
    const {children, path, exact, authorizationStatus} = this.props;
    return (
      <Route
        path={path}
        exact={exact}
        render={() => {
          return (
            authorizationStatus === AuthorizationStatus.AUTH
              ? {children}
              : <Redirect to={`/login`}/>
          );
        }}
      />
    );
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.user.authorizationStatus,
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
