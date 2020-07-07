import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './Header';
import { MainTitle } from './Home';


const Profile = () => {
  return (
    <Container>
      <MainTitle>Профиль</MainTitle>
      <Link to='/addBook'>Добавить книгу</Link>
      <Link to='/addCategory'>Добавить категорию</Link>

    </Container>
  );
};


export default Profile;
