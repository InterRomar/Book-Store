import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from '../components/Header';
import { MainTitle } from './Home';
import FormUploadAvatar from '../forms/FormUploadAvatar';


const Profile = () => {
  return (
    <Container>
      <MainTitle>Профиль</MainTitle>
      <Link to='/addBook'>Добавить книгу</Link>
      <Link to='/addCategory'>Добавить категорию</Link>
      <hr/>
      <br/>
      <br/>

      <FormUploadAvatar />
    </Container>
  );
};


export default Profile;
