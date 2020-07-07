import { addCategoryActions, getCategoriesActions } from '../action_names/action_names';


const { ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE, } = addCategoryActions;
const { GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE, } = getCategoriesActions;


const initialState = {
  loading: false,
  error: '',
  categories: [],
};

const categories_store = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case ADD_CATEGORY_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        categories: [...state.categories, action.payload]
      });
    case ADD_CATEGORY_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    case GET_CATEGORIES_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case GET_CATEGORIES_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        categories: [...state.categories, ...action.payload]
      }
      );
    case GET_CATEGORIES_FAILURE:
      return ({
        ...state,
        loading: false,
        error: action.message
      });
    default:
      return state;
  }
};

export default categories_store;
