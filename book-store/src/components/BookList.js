import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BookCard from './BookCard';
import PageSorting from './PageSorting';


const BookListWrapper = styled.div`
  width: 75%;
  margin-top: 20px;
`;
const StyledBookList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;  
`;

const PageButtonWrapper = styled.div`
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    background: #333;
    left: 0;
    bottom: -10px;
    width: 100%;
    height: 1px;
  }
`;
const PageButton = styled.button`
  cursor: pointer;
  background: transparent;
  color: #333;
  border: none;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;

  &:focus {
    outline: none;
  }
  &.selected {
    color: rgba(150, 68, 197, 0.7);
  }
`;
const BookListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
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
        <BookListHeader>
          <PageButtonWrapper>
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
          </PageButtonWrapper>
          <PageSorting createURL={createURL} params={params}/>
        </BookListHeader>
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
