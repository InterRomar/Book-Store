import React, { useState, useReducer } from 'react';
import styled from 'styled-components';

import { Container } from '../components/Header';
import { Form, FormCol, Input, Title, SubmitBtn } from '../forms/SignInForm';
import FormErrors from '../forms/FormErrors';
import axiosInstance from '../axios';


const LinkRequestTitle = styled(Title)`
  margin-bottom: 50px;
`;

const initialState = {
  value: '',
  formErrors: {
    email: ''
  },
  emailValid: false,
  loading: false,
  infoLabel: 'Укажите ваш email для получения ссылки на восстановление пароля'
};

function reducer(state, action) {
  switch (action.type) {
    case 'setValue':
      return {
        ...state,
        value: action.payload
      };
    case 'setFormErrors':
      return {
        ...state,
        formErrors: action.payload
      };
    case 'setEmailValid':
      return {
        ...state,
        emailValid: action.payload
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload
      };
    case 'setInfoLabel':
      return {
        ...state,
        infoLabel: action.payload
      };

    default:
      return new Error();
  }
}

const PasswordResetLinkRequest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { value, formErrors, emailValid, loading, infoLabel } = state;

  const validateField = (fieldName, value) => {
    const fieldValidationErrors = formErrors;
    let emailValidField = emailValid;
    switch (fieldName) {
      case 'email':
        emailValidField = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValidField ? '' : ' Некорректный email';
        break;
      default:
        break;
    }
    dispatch({ type: 'setFormErrors', payload: fieldValidationErrors });
    dispatch({ type: 'setEmailValid', payload: emailValidField });
  };

  const handleChange = (event) => {
    dispatch({ type: 'setValue', payload: event.target.value });
    validateField(event.target.name, event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({ type: 'setLoading', payload: true });
    dispatch({ type: 'setInfoLabel', payload: 'Проверяем ваш email..' });

    const res = await axiosInstance.post('password-reset/link-request', { user_email: value });
    dispatch({ type: 'setLoading', payload: false });

    if (res.data.success) {
      dispatch({ type: 'setInfoLabel', payload: 'Пиьсьмо с ссылкой было отправлена на ваш email' });
    } else {
      dispatch({ type: 'setInfoLabel', payload: res.data.message });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <LinkRequestTitle> Восстановить пароль </LinkRequestTitle>
        <FormErrors formErrors={formErrors} />

        <FormCol>
          <label> {infoLabel} </label>
          <Input
            placeholder='Введите email..'
            value={value}
            name='email'
            onChange={handleChange}
          />
        </FormCol>

        <FormCol>
          <SubmitBtn
            type='submit'
            value={loading ? 'Отправка..' : 'Отправить'}
            disabled={!emailValid || loading}
          />
        </FormCol>
      </Form>
    </Container>
  );
};

export default PasswordResetLinkRequest;
