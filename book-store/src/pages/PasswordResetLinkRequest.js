import React, { useState } from 'react';
import styled from 'styled-components';

import { Container } from '../components/Header';
import { Form, FormCol, Input, Title, SubmitBtn } from '../forms/SignInForm';
import FormErrors from '../forms/FormErrors';
import axiosInstance from '../axios';


const LinkRequestTitle = styled(Title)`
  margin-bottom: 50px;
`;

const PasswordResetLinkRequest = () => {
  const [value, setValue] = useState('');
  const [formErrors, setFormErrors] = useState({ email: '' });
  const [emailValid, setEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [infoLabel, setInfoLabel] = useState('Укажите ваш email для получения ссылки на восстановление пароля');

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
    setFormErrors(fieldValidationErrors);
    setEmailValid(emailValidField);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    validateField(event.target.name, event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setInfoLabel('Проверяем ваш email..');
    const res = await axiosInstance.post('password-reset/link-request', { user_email: value });
    setLoading(false);

    if (res.data.success) {
      setInfoLabel('Пиьсьмо с ссылкой было отправлена на ваш email');
    } else {
      setInfoLabel(res.data.message);
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
