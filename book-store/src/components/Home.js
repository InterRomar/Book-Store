import React from 'react';
import styled from 'styled-components';
import { Container } from './Header';

export const MainTitle = styled.h1`
  text-align: center;
  font-family: "Arial";
  margin-top: 70px;
  font-size: 60px
`;

const Home = () => {
  return (
    <Container>
      <MainTitle>Home component</MainTitle>
    </Container>
  );
};

export default Home;
