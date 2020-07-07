import axiosInstance from '../../axios';

import { addBookActions, getBooksActions } from '../action_names/action_names';


const { ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE } = addBookActions;
const { GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE } = getBooksActions;


export const addBookAxios = book => {
  return async dispatch => {
    dispatch(requestAddBook());
    try {
      const res = await axiosInstance.post('books/addBook', book);
      if (res.data.success) {
        dispatch(successAddBook(res.data.book));
      } else {
        console.log(res.data.message);
        dispatch(failureAddBook(res.data.message));
      }
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(failureAddBook(error.response.data.message));
      return error.response.data.message;
    }
  };
};
export const getAllBooks = () => {
  return async dispatch => {
    dispatch(requestGetAllBooks());
    const res = await axiosInstance.get('books/getAllBooks');
    if (!res.data.success) {
      dispatch(failureGetAllBooks(res.data.message));
      return;
    }
    dispatch(successGetAllBooks(res.data.books));
  };
};


const requestAddBook = () => ({
  type: ADD_BOOK_REQUEST,
});
const successAddBook = book => ({
  type: ADD_BOOK_SUCCESS,
  payload: book
});
const failureAddBook = (err) => ({
  type: ADD_BOOK_FAILURE,
  message: err
});

const requestGetAllBooks = () => ({
  type: GET_BOOKS_REQUEST,
});
const successGetAllBooks = books => ({
  type: GET_BOOKS_SUCCESS,
  payload: books
});
const failureGetAllBooks = (err) => ({
  type: GET_BOOKS_FAILURE,
  message: err
});
