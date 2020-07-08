import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '../components/Header';
import BookCard from '../components/BookCard';
import Sidebar from '../components/Sidebar';


export const MainTitle = styled.h1`
  text-align: center;
  font-family: "Arial";
  margin-top: 70px;
  font-size: 60px;
`;

const BookList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 75%;
  margin-top: 70px;
  
`;

const MainPage = styled.section`
  display: flex;
  justify-content: space-between;
`;


const Home = ({ books }) => {
  return (
    <Container>
      <MainPage>
        <Sidebar />
        <BookList>
          {books.map(book => <BookCard key={book.id} book={book}/>)}
        </BookList>
      </MainPage>
    </Container>
  );
};
const mapStateToProps = state => ({
  books: state.book_store.books
});

// const mapDispatchToProps = dispatch => ({

// });

export default connect(mapStateToProps, null)(Home);

Home.propTypes = {
  // books: PropTypes.func
};
