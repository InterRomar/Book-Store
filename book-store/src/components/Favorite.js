import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getFavoriteBooks, removeBookFromFavorite } from '../store/current_user/actions';


const FavoriteList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  max-width: 700px;
  margin: 0 auto;
`;
const FavoriteItem = styled.li`
`;
const FavoriteLink = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: space-between;  
  font-family: 'Roboto';
  text-decoration: none;
  color: #333;
  font-size: 17px;
  border: 1px dotted #ccc;
  padding: 10px;
  margin-bottom: 10px;
  padding-right: 30px;
  transition: 0.05s ease-in;
  position: relative;

  & span {
    display: block;
  }
  & span.book__title {
    width: 60%;
  }
  & span.book__author {
    width: 40%;
  }
  & .delete-book {
    position: absolute;
    font-size: 26px;
    top: 50%;
    right: 10px;
    transform: scale(0);
    transition: 0.2s ease-in;
    opacity: 0;
  }

  &:hover {
    background: #333;
    color: #fff;

    & .delete-book {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }
`;
const FavoriteTitle = styled.h1`
  font-family: 'Roboto';
  text-align: center;
  font-weight: 400;
  font-size: 45px;
`;

const Favorite = ({ getFavoriteBooks, removeBookFromFavorite }) => {
  const [books, setBooks] = useState(0);
  const [loading, setLoading] = useState(false);

  // Здесь не получилось сделать через async/await
  useEffect(() => {
    getFavoriteBooks()
      .then(
        (result) => {
          setBooks(result.books);
          setLoading(true);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const removeFromFavorite = async (event, id) => {
    event.preventDefault();

    const res = await removeBookFromFavorite(id);
    if (res.success) {
      const newRequest = await getFavoriteBooks();
      setBooks(newRequest.books);
    }
  };

  if (!loading) {
    return (
    <span>loading..</span>
    );
  }
  return (
    <Fragment>
      <FavoriteTitle>Favorite books</FavoriteTitle>
      <FavoriteList>
      {books.map(book => <FavoriteItem key={book.id}>
        <FavoriteLink to={`/books/${book.id}`}>
          <span className='book__title'>
            {book.title}
          </span>
          <span className='book__author'>
            {book.author}
          </span>
          <i
            className="fa fa-times delete-book"
            aria-hidden="true"
            onClick={(event) => removeFromFavorite(event, book.id)}
          ></i>
        </FavoriteLink>
        </FavoriteItem>)}
      </FavoriteList>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  getFavoriteBooks: () => dispatch(getFavoriteBooks()),
  removeBookFromFavorite: (id) => dispatch(removeBookFromFavorite(id))
});

export default connect(null, mapDispatchToProps)(Favorite);

Favorite.propTypes = {
  getFavoriteBooks: PropTypes.func,
  removeBookFromFavorite: PropTypes.func,
};
