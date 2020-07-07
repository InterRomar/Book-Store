import axios from 'axios';
import axiosInstance from '../../axios';

import { registerActions, loginActions, LOGOUT_USER } from '../action_names/action_names';


const { LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE } = loginActions;

const { REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE } = registerActions;


export const userPostLogin = user => {
  return async dispatch => {
    dispatch(requestLogin());
    try {
      const res = await axiosInstance.post('auth/login', user);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        dispatch(successLogin(res.data.currentUser));
      } else {
        dispatch(failureLogin(res.data.message));
      }
      return res.data;
    } catch (error) {
      console.log(error);
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
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        dispatch(successReg(res.data.user));
      } else {
        dispatch(failureReg(res.data.message));
      }
      return res.data;
    } catch (error) {
      console.log(error);
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
    if (token) {
      const instance = axios.create({
        headers: {
          Authorization: token.split(' ')[1]
        }
      });
      const res = await instance.get('http://localhost:5000/auth/profile');
      if (!res.data.success) {
        dispatch(userLogOut());
        return;
      }
      dispatch(successLogin(res.data.user));
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
