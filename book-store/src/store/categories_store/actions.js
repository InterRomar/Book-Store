import axiosInstance from '../../axios';

import { addCategoryActions, getCategoriesActions } from '../action_names/action_names';


const {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE, } = addCategoryActions;
const {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE, } = getCategoriesActions;


export const addCategoryAxios = category => {
  return async dispatch => {
    dispatch(requestAddCategory());
    try {
      const res = await axiosInstance.post('category', category);

      if (!res.data.success) throw new Error(res);

      dispatch(successAddCategory(res.data.category));
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(failureAddCategory(error.response.data.message));
      return error.response.data.message;
    }
  };
};
export const getAllCategories = () => {
  return async dispatch => {
    dispatch(requestGetAllCategories());

    const res = await axiosInstance.get('category');
    if (!res.data.success) {
      dispatch(failureGetAllCategories(res.data.message));
      return;
    }
    dispatch(successGetAllCategories(res.data.categories));
  };
};


const requestAddCategory = () => ({
  type: ADD_CATEGORY_REQUEST,
});
const successAddCategory = category => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: category
});
const failureAddCategory = (err) => ({
  type: ADD_CATEGORY_FAILURE,
  message: err
});

const requestGetAllCategories = () => ({
  type: GET_CATEGORIES_REQUEST,
});
const successGetAllCategories = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories
});
const failureGetAllCategories = (err) => ({
  type: GET_CATEGORIES_FAILURE,
  message: err
});
