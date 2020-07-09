import { addBookActions, getBooksActions, SET_CURRENT_PAGE, SET_TOTAL_COUNT, SET_CURRENT_CATEGORY } from '../action_names/action_names';


const { ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE } = addBookActions;

const { GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE } = getBooksActions;

const initialState = {
  loading: false,
  error: '',
  books: [],
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  currentCategory: 0,
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
        books: [...state.books, action.payload]
      });
    case GET_BOOKS_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case GET_BOOKS_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case GET_BOOKS_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        books: [...action.payload]
      }
      );
    case SET_CURRENT_PAGE:
      console.log('reducer SET_CURRENT_PAGE', action.payload);
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
