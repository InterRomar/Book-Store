import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { Container } from '../components/Header';


const PasswordReset = (props) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = props.location.pathname.split('/').slice(-1).join('');

    axiosInstance.post('password-reset/token-verification', { token })
      .then(res => {
        console.log(res.data);
        setLoading(false);

        if (res.data.success) {
          setSuccess(true);
        } else {
          setMessage(res.data.message);
        }
      });
  });

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
    // Здесь будет форма восстановления пароля
    <Container>
      <h1>pass reset</h1>
    </Container>
  );
};

export default PasswordReset;
