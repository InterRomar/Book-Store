import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PrivateRoute({ children, isAuth, path, ...rest }) {
  if (path === '/reg' || path === '/login') {
    return (
      <Route
      {...rest}
      render={() => (!isAuth ? (
        children
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
        children
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
  path: PropTypes.string,
  children: PropTypes.element
};
