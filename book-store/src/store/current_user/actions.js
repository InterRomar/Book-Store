import io from 'socket.io-client';
import axiosInstance from '../../axios';

import { Socket } from '../../Socket';

import { registerActions,
  loginActions,
  uploadAvatarActions,
  addBookToFavoriteActions,
  getFavoriteBooksActions,
  removeBookFromFavoriteActions,
  removeNotificationActions,
  LOGOUT_USER,
  getNotificationsActions,
  ADD_NOTIFICATION } from '../action_names/action_names';

const socket = io.connect(process.env.REACT_APP_BASE_URL);


const {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE } = loginActions;
const {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE } = getNotificationsActions;
const {
  REMOVE_NOTIFICATION_REQUEST,
  REMOVE_NOTIFICATION_SUCCESS,
  REMOVE_NOTIFICATION_FAILURE } = removeNotificationActions;
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
export const removeNotification = id => {
  return async dispatch => {
    dispatch(requestRemoveNotification());
    try {
      const res = await axiosInstance.put('notifications/', { id });
      if (!res.data.success) throw new Error(res.data.message);

      dispatch(successRemoveNotification(res.data.notification_id));

      return res.data;
    } catch (error) {
      console.log(error.message);
      dispatch(failureRemoveNotification(error.message));
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

      Socket.connect(res.data.currentUser.id);

      localStorage.setItem('token', res.data.token);
      dispatch(successLogin(res.data.currentUser));

      Socket.socket.on('onUserJoined', message => console.log(message));
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

      Socket.connect(res.data.user.id);
      localStorage.setItem('token', res.data.token);
      dispatch(successReg(res.data.user));

      socket.emit('userJoined', { room: res.data.user.id });
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
    Socket.disconnect();
  };
};

export const getNotifications = () => {
  return async dispatch => {
    dispatch(requestGetNotifications());
    try {
      const resBookNotifications = await axiosInstance.get('notifications/new-books');
      const resMentionNotifications = await axiosInstance.get('notifications/mentions');
      if (!resBookNotifications.data.success && !resMentionNotifications.data.success) {
        throw new Error(resBookNotifications.data.message);
      }

      dispatch(successGetNotifications([
        ...resBookNotifications.data.notifications,
        ...resMentionNotifications.data.notifications
      ]));
      return [...resBookNotifications, ...resMentionNotifications];
    } catch (error) {
      dispatch(failureGetNotifications(error.message));
      return error;
    }
  };
};

export const getProfileFetch = () => {
  return async dispatch => {
    dispatch(requestLogin());
    if (!localStorage.token) return dispatch(failureLogin('token not found'));
    const token = localStorage.token.split(' ')[1];

    if (token) {
      const res = await axiosInstance.get('auth/profile');

      let notifications = [];
      const bookNotificationsRes = await axiosInstance.get('notifications/new-books');
      if (bookNotificationsRes.data.success) {
        notifications = [...notifications, ...bookNotificationsRes.data.notifications];
      }

      const mentionNotificationsRes = await axiosInstance.get('notifications/mentions');
      if (mentionNotificationsRes.data.success) {
        notifications = [...notifications, ...mentionNotificationsRes.data.notifications];
      }
      if (res.data.success) {
        Socket.connect(res.data.user.id);
        Socket.socket.on('onUserJoined', message => console.log(message));
        return dispatch(successLogin(res.data.user, notifications));
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
const successReg = (userObj) => ({
  type: REGISTER_USER_SUCCESS,
  payload: userObj,

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

export const addNotification = (data) => ({
  type: ADD_NOTIFICATION,
  payload: data
});

const requestLogin = () => ({
  type: LOGIN_USER_REQUEST,
});
const successLogin = (userObj, notifications) => ({
  type: LOGIN_USER_SUCCESS,
  payload: userObj,
  notifications
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
const requestRemoveNotification = () => ({
  type: REMOVE_NOTIFICATION_REQUEST,
});
const successRemoveNotification = notification_id => ({
  type: REMOVE_NOTIFICATION_SUCCESS,
  payload: notification_id
});
const failureRemoveNotification = (err) => ({
  type: REMOVE_NOTIFICATION_FAILURE,
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
const requestGetNotifications = () => ({
  type: GET_NOTIFICATIONS_REQUEST,
});
const successGetNotifications = (notifications) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: notifications
});
const failureGetNotifications = (err) => ({
  type: GET_NOTIFICATIONS_FAILURE,
  message: err
});
