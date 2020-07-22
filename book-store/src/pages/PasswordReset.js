import PropTypes from 'prop-types';
import React, { Component } from 'react';

import axiosInstance from '../axios';
import { Container } from '../components/Header';
import { Form, Title, FormCol, Input, SubmitBtn } from '../forms/SignInForm';
import FormErrors from '../forms/FormErrors';

function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
  }).join(''));

  return JSON.parse(jsonPayload);
}

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      success: null,
      message: null,
      password: '',
      confirm_password: '',
      formErrors: { password: '', confirm_password: '' },
      passwordValid: false,
      confirmPasswordValid: false,
      formValid: false,
      email: ''
    };
  }

  componentDidMount() {
    const token = this.props.location.pathname.split('/').slice(-1).join('');

    const res = axiosInstance.post('password-reset/token-verification', { token });

    this.setState({
      loading: false
    });

    if (res.data.success) {
      this.setState({
        success: true,
        email: parseJwt(token).data.email
      });
    } else {
      this.setState({
        message: res.data.message
      });
    }
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;
    switch (fieldName) {
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
      passwordValid,
      confirmPasswordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.passwordValid
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
    const { password, email } = this.state;
    const { userPostLogin } = this.props;

    // Здесь делаю запрос на /password-reset, в случае успешной замены пароля, провожу авторизацию
    const res = await axiosInstance.post('password-reset/', { email, new_password: password });

    if (res.data.success) {
      const user = {
        email,
        password
      };
      userPostLogin(user);
    }
  }


  render() {
    const { loading, success, message } = this.state;

    if (loading) {
      return (
      <div>
        <h1>loading...</h1>
      </div>
      );
    }
    if (!success) {
      return (
        <Container>
          <h3>
            {message || 'Ссылка недействительна, повторите попытку'}
          </h3>
        </Container>
      );
    }
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Title>Сменить пароль</Title>
          <FormErrors formErrors={this.state.formErrors} />

          <FormCol>
            <label>Пароль </label>
            <Input
              type='password'
              name='password'
              placeholder='Новый пароль'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormCol>

          <FormCol>
            <label>Повторите пароль </label>
            <Input
              type='password'
              name='confirm_password'
              placeholder='Повторите новый пароль'
              value={this.state.confirm_password}
              onChange={this.handleChange}
            />
          </FormCol>

          <SubmitBtn type='submit' disabled={!this.state.formValid} value="Подтвердить"/>
        </Form>
      </Container>
    );
  }
}

export default PasswordReset;

PasswordReset.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  userPostLogin: PropTypes.func
};
