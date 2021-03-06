import { addBookActions,
  getBooksActions,
  getBookByIdActions,
  setBookRatingActions,
  SET_CURRENT_PAGE,
  SET_TOTAL_COUNT,
  SET_CURRENT_CATEGORY,
  setCommentActions } from '../action_names/action_names';


const { ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE } = addBookActions;

const { GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE } = getBooksActions;

const {
  SET_BOOK_RATING_REQUEST,
  SET_BOOK_RATING_SUCCESS,
  SET_BOOK_RATING_FAILURE } = setBookRatingActions;

const {
  GET_BOOK_BY_ID_REQUEST,
  GET_BOOK_BY_ID_SUCCESS,
  GET_BOOK_BY_ID_FAILURE } = getBookByIdActions;
const {
  SET_COMMENT_REQUEST,
  SET_COMMENT_SUCCESS,
  SET_COMMENT_FAILURE } = setCommentActions;

const initialState = {
  loading: false,
  error: '',
  books: [],
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  currentCategory: 0,
  currentBook: {}
};

const book_store = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case ADD_BOOK_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case ADD_BOOK_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
      });
    case GET_BOOKS_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case GET_BOOKS_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        books: [...action.payload]
      }
      );
    case GET_BOOKS_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case GET_BOOK_BY_ID_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case GET_BOOK_BY_ID_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        currentBook: action.payload
      }
      );
    case GET_BOOK_BY_ID_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case SET_BOOK_RATING_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case SET_BOOK_RATING_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        currentBook: { ...state.currentBook, ...action.payload }
      }
      );
    case SET_BOOK_RATING_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case SET_COMMENT_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case SET_COMMENT_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        currentBook: {
          ...state.currentBook,
          comments: [action.payload, ...state.currentBook.comments]
        }
      }
      );
    case SET_COMMENT_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case SET_CURRENT_PAGE:
      return ({
        ...state,
        currentPage: action.payload
      }
      );
    case SET_TOTAL_COUNT:
      return ({
        ...state,
        totalCount: action.payload
      }
      );
    case SET_CURRENT_CATEGORY:
      return ({
        ...state,
        currentCategory: action.payload
      }
      );
    default:
      return state;
  }
};

export default book_store;
