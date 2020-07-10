import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
const PageButton = styled.button`
  cursor: pointer;

  &.selected {
    color: red;
  }
`;


class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: +this.props.params.page,
      pageSize: +this.props.params.size,
    };
  }

  changePage = async (event) => {
    const { getBooks, currentCategory, params } = this.props;
    const { pageSize } = this.state;

    const page = +event.target.value;
    console.log(params.page, 'PARAMS PAGE');
    // const page = params.page;
    this.setState({
      currentPage: page
    });

    getBooks(+page, +pageSize, currentCategory);
  }


  render() {
    const { books, totalCount, params, currentCategory, createURL } = this.props;
    const { currentPage, pageSize } = this.state;

    console.log(params.page);
    let pageCount = totalCount / pageSize;
    const pages = [];

    if (!Number.isInteger(pageCount)) pageCount++;
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }

    return (
      <BookListWrapper>
        {pages.map(page => <Link
            key={page}
            to={() => createURL({ page, size: pageSize, category: params.category })}
          >
            <PageButton
              value={page}
              onClick={this.changePage}
              className={currentPage === page && 'selected'}
            >
              {page}
            </PageButton>
          </Link>)}
        <StyledBookList>
          {books.map(book => <BookCard key={book.id} book={book}/>)}
        </StyledBookList>
      </BookListWrapper>
    );
  }
}
const mapStateToProps = state => ({
  books: state.book_store.books,
  currentPage: state.book_store.currentPage,
  totalCount: state.book_store.totalCount,
  pageSize: state.book_store.pageSize,
  currentCategory: state.book_store.currentCategory
});

const mapDispatchToProps = dispatch => ({
  getBooks: (page, size, currentCategory) => dispatch(getAllBooks(page, size, currentCategory)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
