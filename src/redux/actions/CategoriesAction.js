import {GET_ALL_CATEGORIES} from '../constants';
var categories = [
  {id: '1', name: 'category1'},
  {id: '2', name: 'category2'},
  {id: '3', name: 'category3'},
  {id: '4', name: 'category4'},
];

export const getAllCategoriesAction = () => {
  return {
    type: GET_ALL_CATEGORIES,
    payload: categories,
  };
};
