import {combineReducers} from 'redux';
import QuantityReducer from './QuantityReducer';
import CategoriesReducer from './CategoriesReducer';
import DiscountReducer from './DiscountReducer';

const allReducers = combineReducers({
  QuantityReducer,
  CategoriesReducer,
  DiscountReducer,
});

export default allReducers;
