import {
  registerActions,
  loginActions,
  uploadAvatarActions,
  addBookToFavoriteActions,
  LOGOUT_USER,
  getFavoriteBooksActions,
  removeBookFromFavoriteActions,
  ADD_NOTIFICATION } from '../action_names/action_names';


const {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE } = registerActions;
const {
  GET_FAVORITE_BOOKS_REQUEST,
  GET_FAVORITE_BOOKS_SUCCESS,
  GET_FAVORITE_BOOKS_FAILURE } = getFavoriteBooksActions;

const {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE } = loginActions;

const {
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE } = uploadAvatarActions;
const {
  ADD_BOOK_TO_FAVORITE_REQUEST,
  ADD_BOOK_TO_FAVORITE_SUCCESS,
  ADD_BOOK_TO_FAVORITE_FAILURE } = addBookToFavoriteActions;
const {
  REMOVE_BOOK_FROM_FAVORITE_REQUEST,
  REMOVE_BOOK_FROM_FAVORITE_SUCCESS,
  REMOVE_BOOK_FROM_FAVORITE_FAILURE } = removeBookFromFavoriteActions;

const initialState = {
  loading: false,
  error: '',
  user: {},
  notifications: []
};

const current_user = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return ({
        ...state,
        notifications: [...state.notifications, action.payload]
      });
    case LOGIN_USER_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case LOGIN_USER_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message

      });
    case LOGIN_USER_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        user: action.payload
      }
      );
    case UPLOAD_AVATAR_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case UPLOAD_AVATAR_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        user: {
          ...state.user,
          avatar: action.payload
        }
      });
    case UPLOAD_AVATAR_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case GET_FAVORITE_BOOKS_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case GET_FAVORITE_BOOKS_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        user: {
          ...state.user,
          favoriteBooks: action.payload
        }
      });
    case GET_FAVORITE_BOOKS_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case ADD_BOOK_TO_FAVORITE_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case ADD_BOOK_TO_FAVORITE_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        user: {
          ...state.user,
        }
      });
    case ADD_BOOK_TO_FAVORITE_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case REMOVE_BOOK_FROM_FAVORITE_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case REMOVE_BOOK_FROM_FAVORITE_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        user: {
          ...state.user,
          favoriteBooks: state.user.favoriteBooks.filter(book => book.id !== action.payload)
        }
      });
    case REMOVE_BOOK_FROM_FAVORITE_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case REGISTER_USER_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case REGISTER_USER_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case REGISTER_USER_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        user: action.payload
      });
    case LOGOUT_USER:
      return ({
        ...state,
        loading: false,
        error: '',
        user: {}
      });


    default:
      return state;
  }
};

export default current_user;
