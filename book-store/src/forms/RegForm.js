import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormErrors from './FormErrors';
import { Form, FormCol, Input, SubmitBtn, Title } from './SignInForm';

class RegForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      formErrors: { email: '', password: '', confirm_password: '', global: '' },
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      formValid: false
    };
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' Некорректный email';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' Пароль должен быть не менее 6ти символов';
        break;
      case 'confirm_password':
        confirmPasswordValid = value === this.state.password;
        fieldValidationErrors.confirm_password = confirmPasswordValid ? '' : ' Пароли не совпадают';
        break;
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors,
      emailValid,
      passwordValid,
      confirmPasswordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid
                && this.state.passwordValid
                && this.state.confirmPasswordValid
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
        <Title>Регистрация</Title>
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
          <label>Повторите пароль </label>
          <Input
            type='password'
            name='confirm_password'
            placeholder='Повторите пароль'
            value={this.state.confirm_password}
            onChange={this.handleChange}
          />
        </FormCol>

        <SubmitBtn type='submit' disabled={!this.state.formValid} value="Регистрация"/>
      </Form>


    );
  }
}

export default RegForm;


RegForm.propTypes = {
  onSubmit: PropTypes.func,

};
