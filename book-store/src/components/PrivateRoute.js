import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PrivateRoute(props) {
  const { component: Component, isAuth, path, userPostLogin, ...rest } = props;
  if (path === '/reg' || path === '/login' || path === '/password-reset' || path === '/password-reset-link-request') {
    return (
      <Route
      {...rest}
      render={(props) => (!isAuth ? (
        <Component {...props} userPostLogin={userPostLogin}/>
      ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
      ))
      }
    />
    );
  }
  return (
    <Route
      {...rest}
      render={() => (isAuth ? (
        <Component />
      ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
      ))
      }
    />
  );
}

const mapStateToProps = state => ({
  isAuth: !!Object.keys(state.current_user.user).length
});

export default connect(mapStateToProps, null)(PrivateRoute);

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool,
  userPostLogin: PropTypes.func,
  path: PropTypes.string,
  component: PropTypes.element
};
