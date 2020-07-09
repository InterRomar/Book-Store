import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '../components/Header';
import Sidebar from '../components/Sidebar';
import BookList from '../components/BookList';


export const MainTitle = styled.h1`
  text-align: center;
  font-family: "Arial";
  margin-top: 70px;
  font-size: 60px;
`;


const MainPage = styled.section`
  display: flex;
  justify-content: space-between;
`;


const Home = ({ match, location }) => {
  console.log(location.search);
  return (
    <Container>
      <MainPage>
        <Sidebar />
        <BookList />
      </MainPage>
    </Container>
  );
};

export default Home;

Home.propTypes = {
  // books: PropTypes.func
};
