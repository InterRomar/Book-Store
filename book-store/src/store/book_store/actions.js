import axiosInstance from '../../axios';

import { addBookActions, getBooksActions, SET_CURRENT_PAGE, SET_TOTAL_COUNT } from '../action_names/action_names';


const {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE } = addBookActions;
const {
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE } = getBooksActions;


export const addBookAxios = book => {
  return async dispatch => {
    dispatch(requestAddBook());
    try {
      const res = await axiosInstance.post('books', book);

      console.log(res.data.message);
      if (!res.data.success) throw new Error(res.data.message);

      dispatch(successAddBook(res.data.book));

      return res.data;
    } catch (error) {
      console.log('error ');
      console.log(error.message);
      return error;
    }
  };
};
export const getAllBooks = (page, size) => {
  return async dispatch => {
    dispatch(requestGetAllBooks());

    const url = `books?page=${page}&size=${size}`;
    const res = await axiosInstance.get(url);

    if (!res.data.success) {
      dispatch(failureGetAllBooks(res.data.message));
      return;
    }
    dispatch(setTotalCount(res.data.totalCount));
    dispatch(setCurrentPage(page));
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

const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page
});
const setTotalCount = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  payload: totalCount
});
