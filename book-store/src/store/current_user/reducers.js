import { registerActions, loginActions, LOGOUT_USER } from '../action_names/action_names';


const { REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE } = registerActions;

const { LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE } = loginActions;

const initialState = {
  loading: false,
  error: '',
  user: {},
};

const current_user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return ({
        ...state,
        loading: true
      });
    case LOGIN_USER_FAILURE:
      return ({
        ...state,
        loading: false,

      });
    case LOGIN_USER_SUCCESS:
      return ({
        ...state,
        loading: false,
        error: '',
        user: action.payload
      }
      );
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