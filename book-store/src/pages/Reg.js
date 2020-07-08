import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '../components/Header';
import RegForm from '../forms/RegForm';
import { userPostReg } from '../store/current_user/actions';


const Reg = ({ userPostReg }) => {
  const handleSubmit = async (email, password) => {
    const res = await userPostReg({ email, password });
    return res;
  };

  return (
    <Container>
      <RegForm onSubmit={handleSubmit}/>
    </Container>
  );
};


const mapDispatchToProps = dispatch => ({
  userPostReg: userInfo => dispatch(userPostReg(userInfo)),
});

export default connect(null, mapDispatchToProps)(Reg);

Reg.propTypes = {
  userPostReg: PropTypes.func,
};
