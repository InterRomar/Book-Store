import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '../components/Header';
import SignInForm from '../forms/SignInForm';
import { userPostLogin } from '../store/current_user/actions';


const SignIn = ({ userPostLogin }) => {
  const handleSubmit = async (email, password) => {
    const res = await userPostLogin({ email, password });
    return res;
  };

  return (
    <Container>
      <SignInForm onSubmit={handleSubmit}/>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  userPostLogin: userInfo => dispatch(userPostLogin(userInfo))
});

export default connect(null, mapDispatchToProps)(SignIn);


SignIn.propTypes = {
  userPostLogin: PropTypes.func,
};
