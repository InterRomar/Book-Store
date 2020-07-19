import axiosInstance from '../../axios';

import { registerActions,
  loginActions,
  uploadAvatarActions,
  addBookToFavoriteActions,
  getFavoriteBooksActions,
  removeBookFromFavoriteActions,
  LOGOUT_USER } from '../action_names/action_names';


const {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE } = loginActions;
const {
  GET_FAVORITE_BOOKS_REQUEST,
  GET_FAVORITE_BOOKS_SUCCESS,
  GET_FAVORITE_BOOKS_FAILURE } = getFavoriteBooksActions;
const {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE } = registerActions;

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

export const getFavoriteBooks = () => {
  return async dispatch => {
    dispatch(requestGetFavoriteBooks());
    try {
      const res = await axiosInstance.get('auth/favorite');

      if (!res.data.success) throw new Error(res.data.message);

      dispatch(successGetFavoriteBooks(res.data.books));

      return res.data;
    } catch (error) {
      console.log(error.message);
      dispatch(failureGetFavoriteBooks(error.message));
      return error;
    }
  };
};
export const addBookToFavorite = data => {
  return async dispatch => {
    dispatch(requestAddBookToFavorite());
    try {
      const res = await axiosInstance.post('auth/add-favorite', data);

      if (!res.data.success) throw new Error(res.data.message);

      dispatch(successAddBookToFavorite(res.data.book));

      return res.data;
    } catch (error) {
      console.log(error.message);
      dispatch(failureAddBookToFavorite(error.message));
      return error;
    }
  };
};
export const removeBookFromFavorite = data => {
  return async dispatch => {
    dispatch(requestRemoveBookFromFavorite());
    try {
      const res = await axiosInstance.post('auth/remove-favorite', { id: data });

      if (!res.data.success) throw new Error(res.data.message);

      dispatch(successRemoveBookFromFavorite(res.data.id));

      return res.data;
    } catch (error) {
      console.log(error.message);
      dispatch(failureRemoveBookFromFavorite(error.message));
      return error;
    }
  };
};
export const userPostLogin = user => {
  return async dispatch => {
    dispatch(requestLogin());
    try {
      const res = await axiosInstance.post('auth/login', user);

      if (!res.data.success) throw new Error(res.data.message);

      localStorage.setItem('token', res.data.token);
      dispatch(successLogin(res.data.currentUser));

      return res.data;
    } catch (error) {
      console.log(error.message);
      dispatch(failureLogin(error.message));
      return error;
    }
  };
};


export const userPostReg = user => {
  return async dispatch => {
    dispatch(requestReg());
    try {
      const res = await axiosInstance.post('auth/reg', user);

      if (!res.data.success) throw new Error(res.data.message);

      localStorage.setItem('token', res.data.token);
      dispatch(successReg(res.data.user));
      return res.data;
    } catch (error) {
      dispatch(failureReg(error.message));
      return error;
    }
  };
};
export const userUploadAvatar = (avatar) => {
  return async dispatch => {
    dispatch(requestUploadAvatar());
    try {
      const res = await axiosInstance.post('/auth/upload-avatar', avatar);

      if (!res.data.success) throw new Error(res.data.message);

      dispatch(successUploadAvatar(res.data.avatar));
      return res.data;
    } catch (error) {
      dispatch(failureUploadAvatar(error.message));
      return error;
    }
  };
};

export const userLogOut = () => {
  return dispatch => {
    dispatch(logout());
    localStorage.removeItem('token');
  };
};

export const getProfileFetch = () => {
  return async dispatch => {
    dispatch(requestLogin());
    if (!localStorage.token) return dispatch(failureLogin('token not found'));
    const token = localStorage.token.split(' ')[1];

    function parseJwt (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
      }).join(''));

      return JSON.parse(jsonPayload);
    }

    if (token) {
      const decodedToken = parseJwt(token);

      const res = await axiosInstance.get('auth/profile');
      if (res.data.success) {
        return dispatch(successLogin(res.data.user));
      }
    }
    dispatch(userLogOut());
    return dispatch(failureLogin('token not found'));
  };
};


const logout = () => ({
  type: LOGOUT_USER
});

const requestReg = () => ({
  type: REGISTER_USER_REQUEST,
});
const successReg = userObj => ({
  type: REGISTER_USER_SUCCESS,
  payload: userObj
});

const failureReg = (err) => ({
  type: REGISTER_USER_FAILURE,
  message: err
});
const requestGetFavoriteBooks = () => ({
  type: GET_FAVORITE_BOOKS_REQUEST,
});
const successGetFavoriteBooks = books => ({
  type: GET_FAVORITE_BOOKS_SUCCESS,
  payload: books
});

const failureGetFavoriteBooks = (err) => ({
  type: GET_FAVORITE_BOOKS_FAILURE,
  message: err
});


const requestLogin = () => ({
  type: LOGIN_USER_REQUEST,
});
const successLogin = userObj => ({
  type: LOGIN_USER_SUCCESS,
  payload: userObj
});
const failureLogin = (err) => ({
  type: LOGIN_USER_FAILURE,
  message: err
});
const requestAddBookToFavorite = () => ({
  type: ADD_BOOK_TO_FAVORITE_REQUEST,
});
const successAddBookToFavorite = book => ({
  type: ADD_BOOK_TO_FAVORITE_SUCCESS,
  payload: book
});
const failureAddBookToFavorite = (err) => ({
  type: ADD_BOOK_TO_FAVORITE_FAILURE,
  message: err
});
const requestRemoveBookFromFavorite = () => ({
  type: REMOVE_BOOK_FROM_FAVORITE_REQUEST,
});
const successRemoveBookFromFavorite = id => ({
  type: REMOVE_BOOK_FROM_FAVORITE_SUCCESS,
  payload: id
});
const failureRemoveBookFromFavorite = (err) => ({
  type: REMOVE_BOOK_FROM_FAVORITE_FAILURE,
  message: err
});

const requestUploadAvatar = () => ({
  type: UPLOAD_AVATAR_REQUEST,
});
const successUploadAvatar = avatar => ({
  type: UPLOAD_AVATAR_SUCCESS,
  payload: avatar
});
const failureUploadAvatar = (err) => ({
  type: UPLOAD_AVATAR_FAILURE,
  message: err
});
