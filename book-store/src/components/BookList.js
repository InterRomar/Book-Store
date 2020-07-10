import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BookCard from './BookCard';


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
      pageSize: +this.props.params.size,
    };
  }

  render() {
    const { books, totalCount, params, createURL } = this.props;
    const { pageSize } = this.state;

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
            to={() => createURL({ ...params, page, size: pageSize })}
          >
            <PageButton
              className={+params.page === page && 'selected'}
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
  totalCount: state.book_store.totalCount,
  pageSize: state.book_store.pageSize,
  currentCategory: state.book_store.currentCategory
});


export default connect(mapStateToProps, null)(BookList);

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
  params: PropTypes.shape({
    page: PropTypes.string,
    size: PropTypes.string,
    category: PropTypes.string
  }),
  createURL: PropTypes.func,
  totalCount: PropTypes.number
};
