import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from './Header';
import BookCard from './BookCard';


export const MainTitle = styled.h1`
  text-align: center;
  font-family: "Arial";
  margin-top: 70px;
  font-size: 60px
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

const Sidebar = styled.section`
  width: 23%;
  margin-top: 20px;
  border: 1px solid #ccc;

  
`;

const Home = ({ books }) => {
  return (
    <Container>
      <MainPage>
        <Sidebar></Sidebar>
        <BookList>
          {books().map(book => <BookCard key={book.id} book={book}/>)}
        </BookList>
      </MainPage>
    </Container>
  );
};
const mapStateToProps = state => ({
  books: () => state.book_store.books
});

// const mapDispatchToProps = dispatch => ({

// });

export default connect(mapStateToProps, null)(Home);

Home.propTypes = {
  books: PropTypes.func
};
