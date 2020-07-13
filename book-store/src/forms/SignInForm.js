import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import FormErrors from './FormErrors';

export const Title = styled.h1`
  font-family: 'Arial';
  text-align: center;
  font-size: 40px;
`;

export const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

export const FormCol = styled.div`
  margin-bottom: 30px;
  & label {
    display: block;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-family: 'Arial';
    }
  & input {
    display: block;
  }
  & select {
    display: block;
  }
`;

export const Input = styled.input`
  width: 100%;
  font-size: 18px;
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 5px 10px;
`;

export const SubmitBtn = styled.input`
  display: block;
  margin: 0 auto;
  color: #000000;
  border: 1px solid #333;
  background-color: transparent;
  font-size: 18px;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.15s ease-in;

  &:hover {
    background-color: #333;
    color: #ffffff;
  }
  &:disabled {
    opacity: 0.6;

    &:hover {
      background-color: transparent;
      color: #333;
      cursor: default;
    }
  }
`;


class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '', confirm_password: '', global: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' Некорректный email';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' Пароль должен быть не менее 6ти символов';
        break;
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors,
      emailValid,
      passwordValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid
                && this.state.passwordValid
    });
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    }, () => {
      this.validateField(name, value);
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const res = await this.props.onSubmit(email, password);
    if (!res.success) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          global: res.message
        }
      });
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Title>Войти</Title>
        <FormErrors formErrors={this.state.formErrors} />

        <FormCol>
          <label>Email </label>
          <Input
            name='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormCol>

        <FormCol>
          <label>Пароль </label>
          <Input
            type='password'
            name='password'
            placeholder='Пароль'
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormCol>

        <FormCol>
          <SubmitBtn type='submit' disabled={!this.state.formValid} value='Войти'/>
        </FormCol>
      </Form>
    );
  }
}

export default SignInForm;


SignInForm.propTypes = {
  onSubmit: PropTypes.func,
};
