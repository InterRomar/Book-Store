import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import BookCard from './BookCard';
import { getAllBooks } from '../store/book_store/actions';

const BookListWrapper = styled.div`
  width: 75%;
  margin-top: 70px;
`;
const StyledBookList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  
`;

class BookList extends Component {
  changePage = (event) => {
    const page = +event.target.value;
    this.props.getBooks(page, 10);
  }

  render() {
<<<<<<< HEAD
    const { books, totalCount, pageSize } = this.props;

    let pageCount = totalCount / pageSize;
    const pages = [];

    if (!Number.isInteger(pageCount)) pageCount++;
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }

    return (
      <BookListWrapper>
      {pages.map(page => 
        <button value={page}> {page}</button> 
      )}
=======
    const { books } = this.props;
    return (
      <BookListWrapper>
        <button onClick={this.changePage} value='1'>1</button>
        <button onClick={this.changePage} value='2'>2</button>
        <button onClick={this.changePage} value='3'>3</button>
        <button onClick={this.changePage} value='4'>4</button>
>>>>>>> 89ca242f3f139822f92f2d73adcf75e0e26e4a38
        <StyledBookList>
          {books.map(book => <BookCard key={book.id} book={book}/>)}
        </StyledBookList>
      </BookListWrapper>
    );
  }
}
const mapStateToProps = state => ({
<<<<<<< HEAD
  books: state.book_store.books,
  currentPage: state.book_store.currentPage,
  totalCount: state.book_store.totalCount,
  pageSize: state.book_store.pageSize
=======
  books: state.book_store.books
>>>>>>> 89ca242f3f139822f92f2d73adcf75e0e26e4a38
});

const mapDispatchToProps = dispatch => ({
  getBooks: (page, size) => dispatch(getAllBooks(page, size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
