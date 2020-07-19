import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Container } from '../components/Header';
import { MainTitle } from './Home';
import FormUploadAvatar from '../forms/FormUploadAvatar';

const ProfileLinks = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  margin: 0 auto 20px auto;

`;
const ProfileLink = styled(Link)`
  border: 2px solid #333;
  padding: 7px 15px;
  border-radius: 4px;
  font-family: 'Roboto';
  font-size: 17px;
  font-weight: 400;
  cursor: pointer;
  transition: 0.1s ease-in;
  text-decoration: none;
  color: #333;

  &:hover {
    background-color: #333;
    color: #fff;
    transform: scale(1.03);
  }
`;

const Profile = () => {
  return (
    <Container>
      <MainTitle>Профиль</MainTitle>
      <ProfileLinks>
        <ProfileLink to='/addBook'>Добавить книгу</ProfileLink>
        <ProfileLink to='/addCategory'>Добавить категорию</ProfileLink>
        <ProfileLink to='/favorite'>Избранное</ProfileLink>
      </ProfileLinks>
      <hr/>
      <FormUploadAvatar />
    </Container>
  );
};


export default Profile;
