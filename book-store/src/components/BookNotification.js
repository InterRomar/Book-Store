import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const StyledBookNotification = styled.div`
  font-size: 15px;
  color: #333;
  font-family: 'Roboto';
  line-height: 22px;
  padding-right: 30px;
  position: relative;
  transition: 0.05s ease-in;
  &:hover {
    background-color: rgb(247, 233, 255);

  }
  & .notification__delete {
    position: absolute;
    right: 5px;
    top: 0;
    font-size: 20px;
    cursor: pointer;
    background: transparent;
    border: none;
    transition: 0.06s ease-in;

    &:hover {
      transform-origin: center center;
      transform: scale(1.2)
    }
    &:focus {
      outline: none;
    }
  }

  & .notification__head {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      width: 100px;
      background: #333;
  }

  & .category {
    margin: 0 4px;
    font-weight: 500;
    display: block;
    text-align: right;
  }
  & .creator {
    margin: 0 4px;
    font-weight: 500;
    font-style: italic;
    }
  }
  & .title {
    display: block;
    font-weight: 500;
    font-size: 17px;
    text-align: center;
    padding: 10px 0;
  }
`;
const BookNotification = (props) => {
  const { book, category, user, id } = props.notification;
  const handleClick = () => {
    props.removeNotification(id);
  };
  return (
    <StyledBookNotification>
      <div className="notification__head">
        <span className="creator">
          {user.email}
        </span>
        добавил новую книгу.
        <span className='category'>
          Категория {category.title}
        </span>
      </div>
      <div className="notification__body">
        <span className="title">
          {book.title}
        </span>
      </div>
      <button className="notification__delete" onClick={handleClick}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </button>
    </StyledBookNotification>
  );
};

export default BookNotification;

BookNotification.propTypes = {
  removeNotification: PropTypes.func,
  notification: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      avatar: PropTypes.string
    }),
    book: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      author: PropTypes.string,
      category: PropTypes.number,
      price: PropTypes.string
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  })
};
