import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '../components/Header';
import SignInForm from '../forms/SignInForm';
import { userPostLogin, getNotifications } from '../store/current_user/actions';


const SignIn = (props) => {
  const { userPostLogin, getNotifications } = props;
  const handleSubmit = async (email, password) => {
    const res = await userPostLogin({ email, password });
    await getNotifications();
    return res;
  };

  return (
    <Container>
      <SignInForm onSubmit={handleSubmit}/>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  userPostLogin: userInfo => dispatch(userPostLogin(userInfo)),
  getNotifications: () => dispatch(getNotifications())
});

export default connect(null, mapDispatchToProps)(SignIn);


SignIn.propTypes = {
  userPostLogin: PropTypes.func,
  getNotifications: PropTypes.func,
};
