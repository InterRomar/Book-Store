import QueryParser from 'query-string';
import axiosInstance from '../../axios';

import { addBookActions,
  getBooksActions,
  getBookByIdActions,
  SET_CURRENT_PAGE,
  SET_TOTAL_COUNT,
  SET_CURRENT_CATEGORY } from '../action_names/action_names';


const {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE } = addBookActions;
const {
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE } = getBooksActions;

const {
  GET_BOOK_BY_ID_REQUEST,
  GET_BOOK_BY_ID_SUCCESS,
  GET_BOOK_BY_ID_FAILURE } = getBookByIdActions;


export const addBookAxios = (book, img) => {
  return async dispatch => {
    dispatch(requestAddBook());
    try {
      const res = await axiosInstance.post('books', book);

      if (!res.data.success) throw new Error(res.data.message);

      console.log(book, img);
      const coverRes = await axiosInstance.post(`books/upload-cover/${res.data.book.id}`, img);

      dispatch(successAddBook(coverRes.data.book));

      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(failureAddBook(error.response.data.message));
      return { succes: false, message: error.response.data.message };
    }
  };
};
export const getAllBooks = (url) => {
  return async dispatch => {
    dispatch(requestGetAllBooks());

    const params = QueryParser.parse(url);
    const { page, category } = params;

    const res = await axiosInstance.get(`books${url}`);

    if (!res.data.success) {
      dispatch(failureGetAllBooks(res.data.message));
      return;
    }

    if (category) dispatch(setCurrentCategory(category));

    dispatch(setTotalCount(res.data.totalCount));
    dispatch(setCurrentPage(page));
    dispatch(successGetAllBooks(res.data.books));
  };
};
export const getBookById = (id) => {
  return async dispatch => {
    dispatch(requestGetBookById());

    const res = await axiosInstance.get(`books/${id}`);
    if (!res.data.success) {
      dispatch(failureGetBookById(res.data.message));
      return;
    }
    dispatch(successGetBookById({ ...res.data.book, appreciated: res.data.appreciated }));
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

const requestGetBookById = () => ({
  type: GET_BOOK_BY_ID_REQUEST,
});
const successGetBookById = book => ({
  type: GET_BOOK_BY_ID_SUCCESS,
  payload: book
});
const failureGetBookById = (err) => ({
  type: GET_BOOK_BY_ID_FAILURE,
  message: err
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page
});
const setTotalCount = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  payload: totalCount
});
const setCurrentCategory = (category) => ({
  type: SET_CURRENT_CATEGORY,
  payload: category
});
