import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';

import styled from 'styled-components';
import { Container } from '../components/Header';
import { getBookById } from '../store/book_store/actions';

const BookHeader = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;
const BookBody = styled.div`
  display: flex;
  
  .col-l {
    width: 70%;
  }
  .col-s {
    width: 30%;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 500px;
    padding: 20px;  

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .react-stars:focus {
    outline: none;
    }

    & .appreciated-notice {
      font-family: 'Roboto';
      color: red;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        width: 60%;
        height: 1px;
        background-color: red;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;
const BookTitle = styled.h1`
  font-family: 'Roboto';
  font-size: 40px;
  font-weight: 400;
  margin: 0;  
  margin-bottom: 10px;
`;
const BookAuthor = styled.span`
  font-family: 'Arial';
  font-size: 20px;
  margin-left: 20px;
  color: #ccc;
  color: rgb(167, 167, 167);  
  position: relative;
  
`;
const BookImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;  
  height: 500px;
`;
const BookImg = styled.img`
  height: 100%;
  width: auto;
`;

const BookDescription = styled.div`
  padding: 20px;
  border-top: 1px solid #ccc;

  font-family: 'Roboto';
  font-size: 15px;
  line-height: 22px;
`;

const BookPrice = styled.span`
  display: block;
  font-weight: bold;
  color: rgb(150, 68, 197);
  font-size: 45px;
  font-family: 'Roboto'; 
  font-weight: 400; 
  margin: 20px 0;
`;
const FavoriteBtn = styled.button`
  font-size: 25px;
  border: none;
  background-color: rgba(150, 68, 197, 1);
  padding: 8px 14px;
  display: block;
  margin: 20px 0;
  color: #fff;
  
  cursor: pointer;
  transition: 0.06s ease-in;
  
  &:hover {
    box-shadow: 3px 3px 10px rgba(0,0,0,0.6);
    transform: scale(1.02);
  }
  &:focus {
    outline: none;
  }
`;
const BookRatingTitle = styled.h3`
  font-family: 'Roboto';
  font-weight: 400;

  & span {
    font-weight: 500;
    font-size: 25px;
    margin-left: 10px;
  }
`;
class BookPage extends Component {
  async componentDidMount() {
    await this.props.getBookById(this.props.match.params.id);
  }

  render() {
    const { match, book, currentUser } = this.props;
    const id = match.params.id;


    if (!id) {
      return (
        <Container>
          <h1>Такой книги не существует..</h1>
        </Container>
      );
    }
    const { title,
      author,
      description,
      price,
      rating,
      img,
      demo_fragment,
      appreciated } = book;

    let isAppreciated;

    if (currentUser && appreciated) {
      isAppreciated = appreciated.includes(Number(currentUser.id));
    }

    const baseURL = 'http://localhost:5000/';
    const bookImg = img || 'bookCoverPlaceholder.png';

    return (
      <Container>
        <BookHeader>
          <BookTitle> {title} </BookTitle>
          <BookAuthor> {author} </BookAuthor>
        </BookHeader>
        <BookBody>
          <div className="col-l">
            <BookImgWrapper>
              <BookImg src={`${baseURL}uploads/${bookImg}`}/>
            </BookImgWrapper>
            <BookDescription>
              <h3>Описание</h3>
              <p>
              {description}

              </p>
            </BookDescription>
          </div>
          <div className="col-s">
            <div>
              <BookPrice>
                {price}₽
              </BookPrice>
              <FavoriteBtn>
                Добавить в избранное
              </FavoriteBtn>
            </div>
            <div>
              <BookRatingTitle>
                Рейтинг:
                <span> {rating} </span>
              </BookRatingTitle>
              {!isAppreciated &&
                <ReactStars
                  count={5}
                  // onChange={this.ratingChanged}
                  value={0}
                  size={60}
                  activeColor="#9644c5"
                />
              }
              {isAppreciated &&
                <span className='appreciated-notice'>Вы оценили данную книгу!</span>
              }
            </div>
          </div>
        </BookBody>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  book: state.book_store.currentBook,
  currentUser: state.current_user.user
});
const mapDispatchToProps = dispatch => ({
  getBookById: id => dispatch(getBookById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);


BookPage.propTypes = {
  getBookById: PropTypes.func,
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.string,
    img: PropTypes.string,
    demo_fragment: PropTypes.string
  }),
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string
    }),
    isExact: PropTypes.bool,
  }),
};
