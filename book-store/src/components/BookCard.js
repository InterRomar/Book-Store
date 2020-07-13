import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.li`
  border-radius: 5px;
  background-color: #ffe;
  min-width: 23%; 
  margin-bottom: 30px;
  padding: 10px 20px;
  box-sizing: border-box;
  min-width: 270px;
  font-family: 'Arial';
  box-shadow: 3px 3px 10px rgba(0,0,0,0.5);
  text-align: center;
`;

const BookTitle = styled.h3`
  font-size: 18px;
  margin: 15px 0;
  margin-bottom: 15px;
  text-align: center;
`;
const ImgWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  margin: -10px -20px 0;
  padding-top: 10px;
  background-color: rgb(218, 216, 216);


`;
const BookImg = styled.img` 
  width: auto;
  height: 100%;
`;
const BookPrice = styled.small`
  display: block;
  font-weight: bold;
  color: blue;
  color: rgb(150, 68, 197);
  font-size: 18px;
  margin-top: 20px;
`;

const BookAuthor = styled.span`
  font-style: italic;
  color: #ccc;
  color: rgb(167, 167, 167);  
  position: relative;
  

  &::after {
    content: '';
    position: absolute;
    background-color: rgb(167, 167, 167);
    height: 1px;
    width: 50%;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const BookCard = ({ book }) => {
  const baseURL = 'http://localhost:5000/';
  const img = book.img || 'bookCoverPlaceholder.png';
  return (
    <Card>
      <ImgWrapper>
        <BookImg src={`${baseURL}uploads/${img}`}/>
      </ImgWrapper>
      <BookTitle> {book.title} </BookTitle>
      <BookAuthor> {book.author} </BookAuthor>
      <BookPrice> {book.price}₽</BookPrice>
    </Card>
  );
};

export default BookCard;

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.string,
    img: PropTypes.string
  })
};
