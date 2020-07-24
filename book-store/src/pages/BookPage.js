import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';
import io from 'socket.io-client';

import styled from 'styled-components';
import { Container, Avatar } from '../components/Header';
import { getBookById, setBookRating, setComment } from '../store/book_store/actions';
import { addBookToFavorite } from '../store/current_user/actions';
import { Form, FormCol, SubmitBtn } from '../forms/SignInForm';
import { Textarea } from './AddBook';

const socket = io.connect(process.env.REACT_APP_BASE_URL);


function prepareCommentText(comment) {
  if (!comment.answerTo) {
    return { __html: comment.text };
  }

  const reg = /\S+@\S+\.\S+/;
  const result = comment.text.split(' ').map(word => {
    if (reg.test(word)) {
      return `<address> ${word} </address>`;
    }
    return word;
  }).join(' ');
  return { __html: result };
}
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
const BookComments = styled.div`
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
const CommentAvatar = styled(Avatar)`
  margin-left: 0;
  margin-right: 20px;
`;
const Comment = styled.a`
  display: block;
  padding: 15px;
  border: 1px dotted #ccc;
  margin-bottom: 15px;
  transition: 0.08s ease-in;
  position: relative;
  color: #333;
  text-decoration: none;

  &:hover {
    cursor: ${props => (props.answerTo ? 'pointer' : 'default')};
    transform: ${props => (props.answerTo ? 'translateY(-5px)' : 'none')}
  }
  & .comment__header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center; 
  }

  & .comment__author {
    display: flex;
    align-items: center; 
  }

  & .set-mention {
    font-size: 16px;
    background: transparent;
    border: 1px solid #333;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.07s ease-in;

    &:hover {
      background: #333;
      color: #fff;
    }
  }

  & .comment__author {
    font-style: italic;
    font-weight: bold;
  }
  & address {
    color: red;
  }
`;
const CommentForm = styled(Form)`
  margin: 0 auto;
  max-width: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;

`;

const CommentFormPlaceholder = styled.p`
  font-size: 17px;
  font-family: 'Roboto';
  color: red;
  padding: 15px;
  border: 1px solid red;
  margin-bottom: 40px;
`;

class BookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.loading,
      commentText: '',
      answerTo: null
    };
  }

  async componentDidMount() {
    await this.props.getBookById(this.props.match.params.id);
  }

  ratingChanged = async (value) => {
    const { book, currentUser, setBookRating } = this.props;
    const data = {
      bookID: book.id,
      userID: currentUser.id,
      newRating: value
    };

    await setBookRating(data);
  }

  addToFavorite = async () => {
    const { book, currentUser, addBookToFavorite, getBookById, history, isAuth } = this.props;
    if (!isAuth) {
      history.push('/login');
    }
    const data = {
      book_id: book.id,
      user_id: currentUser.id
    };

    await addBookToFavorite(data);
    await getBookById(this.props.match.params.id);
  }

  setMention = (id) => {
    const { book } = this.props;
    const comment = book.comments.find(comment => comment.id === id);

    this.setState({
      answerTo: comment.id,
      commentText: `${comment.user_id.email} \n`
    });
    this.nameTextArea.focus();
  }

  addComment = async (event) => {
    event.preventDefault();

    const { setComment, book } = this.props;
    const { commentText, answerTo } = this.state;

    const comment = {
      book_id: book.id,
      text: commentText,
    };

    let answerTarget;
    if (answerTo) {
      answerTarget = book.comments.find(c => c.id === answerTo).user_id;
      if (commentText.split(' ').includes(answerTarget.email)) {
        comment.answerTo = answerTo;
        comment.target_user_id = answerTarget.id;
      }
    }
    await setComment(socket, comment);

    this.setState({
      commentText: '',
      answerTo: null
    });
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  commentClick = (event, answerTo) => {
    if (!answerTo || event.target.tagName === 'BUTTON') {
      event.preventDefault();
    }
  }

  render() {
    const { loading, commentText } = this.state;
    const { match, book, isAuth } = this.props;
    const id = match.params.id;

    if (loading) {
      return (
        <Container>
          <h1>loading..</h1>
        </Container>
      );
    }

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
      isAppreciated,
      isFavorite } = book;

    const bookImg = img || 'bookCoverPlaceholder.png';
    let fixedRating;
    if (rating) {
      fixedRating = Number(rating).toFixed(2);
    }


    return (
      <Container>
        <BookHeader>
          <BookTitle> {title} </BookTitle>
          <BookAuthor> {author} </BookAuthor>
        </BookHeader>
        <BookBody>
          <div className="col-l">
            <BookImgWrapper>
              <BookImg src={`${process.env.REACT_APP_BASE_URL}uploads/${bookImg}`}/>
            </BookImgWrapper>
            <BookDescription>
              <h3>Описание</h3>
              <p>
              {description}

              </p>
            </BookDescription>
            <BookComments>
              <h3>Отзывы</h3>

              {isAuth &&
                <CommentForm onSubmit={this.addComment}>
                  <FormCol>
                    <Textarea
                      name="commentText"
                      placeholder='Напишите ваш отзыв..'
                      value={commentText}
                      onChange={this.handleChange}
                      ref={(textArea) => { this.nameTextArea = textArea; }}
                    />
                  </FormCol>
                  <SubmitBtn type='submit' disabled={commentText === ''} value='Отправить' />
                </CommentForm>
              }
              {!isAuth &&
                <CommentFormPlaceholder
                >
                  Комментировать могуть только авторизованные пользователи
                </CommentFormPlaceholder>
              }

              {book.comments &&
                book.comments.map(comment => <Comment
                  key={comment.id}
                  answerTo={comment.answerTo}
                  id={comment.id}
                  onClick={(event) => this.commentClick(event, comment.answerTo)}
                  href={comment.answerTo ? `#${comment.answerTo}` : '#'}
                >
                  <div className="comment__header">
                    <div className="comment__author">
                      <CommentAvatar src={`${process.env.REACT_APP_BASE_URL}uploads/${
                        comment.user_id.avatar || 'userAvatarPlaceholder.jpeg'
                      }`} />
                      <span className="comment__author">
                        {comment.user_id.email}
                      </span>
                    </div>
                    <button
                      className="set-mention"
                      onClick={() => this.setMention(comment.id)}
                    >
                      Ответить
                    </button>
                  </div>
                  <div
                    className="comment__body"
                    dangerouslySetInnerHTML={prepareCommentText(comment)}
                  >

                  </div>
                </Comment>)
              }
            </BookComments>
          </div>
          <div className="col-s">
            <div>
              <BookPrice>
                {price}₽
              </BookPrice>
              {!isFavorite &&
                <FavoriteBtn
                  onClick={this.addToFavorite}
                >
                  Добавить в избранное
                </FavoriteBtn>
              }
              {isFavorite &&
                <p>
                  Книга добавлена в избранное!
                </p>
              }
            </div>
            <div>
              <BookRatingTitle>
                Рейтинг:
                <span> {fixedRating} </span>
              </BookRatingTitle>
              {isAuth &&
                <Fragment>
                  {!isAppreciated &&
                    <ReactStars
                      count={5}
                      onChange={this.ratingChanged}
                      value={0}
                      size={60}
                      activeColor="#9644c5"
                    />
                  }
                  {isAppreciated &&
                    <span className='appreciated-notice'>Вы оценили данную книгу!</span>
                  }
                </Fragment>
              }
            </div>
          </div>
        </BookBody>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.book_store.loading,
  book: state.book_store.currentBook,
  currentUser: state.current_user.user,
  isAuth: !!Object.keys(state.current_user.user).length,

});
const mapDispatchToProps = dispatch => ({
  getBookById: id => dispatch(getBookById(id)),
  setBookRating: data => dispatch(setBookRating(data)),
  addBookToFavorite: data => dispatch(addBookToFavorite(data)),
  setComment: (socket, comment) => dispatch(setComment(socket, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);


BookPage.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number,
    avatar: PropTypes.string
  }),
  loading: PropTypes.bool,
  setComment: PropTypes.func,
  isAuth: PropTypes.bool,
  getBookById: PropTypes.func,
  addBookToFavorite: PropTypes.func,
  setBookRating: PropTypes.func,
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.string,
    img: PropTypes.string,
    demo_fragment: PropTypes.string,
    isAppreciated: PropTypes.bool,
    isFavorite: PropTypes.bool,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        book_id: PropTypes.number,
        user_id: PropTypes.shape({
          id: PropTypes.number,
          email: PropTypes.string,
          avatar: PropTypes.string
        }),
        text: PropTypes.string
      })
    )
  }),
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string
    }),
    isExact: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
