import {GET_ALL_CATEGORIES} from '../constants';
import initialState from '../initialState';
const INITIAL_STATE = initialState.categories_list;

const CategoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export default CategoriesReducer;
