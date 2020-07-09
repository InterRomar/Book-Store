import axiosInstance from '../../axios';

import { registerActions, loginActions, LOGOUT_USER } from '../action_names/action_names';


const {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE } = loginActions;

const {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE } = registerActions;


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
      console.log(user);
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

export const userLogOut = () => {
  return dispatch => {
    dispatch(logout());
    localStorage.removeItem('token');
  };
};

export const getProfileFetch = () => {
  return async dispatch => {
    dispatch(requestLogin());
    const token = localStorage.token;

    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    }; 

    if (token) {
      const decodeToken = parseJwt(token);
      // const res = await axiosInstance.get('auth/profile');
      // if (!res.data.success) {
      //   dispatch(userLogOut());
      //   return;
      // }
      const { id, email} = decodeToken.data;
      return dispatch(successLogin({ id, email }));
    } else {
      return dispatch(failureLogin('token not found'))
    }
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
