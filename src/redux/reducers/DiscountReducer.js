import {INCREAMENT_DISCOUNT, DECREAMENT_DISCOUNT} from '../constants';
import initialState from '../initialState';
const INITIAL_STATE = initialState.discount;

const DiscountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREAMENT_DISCOUNT:
      return state + action.step;
    case DECREAMENT_DISCOUNT:
      return state - action.step;
    default:
      return state;
  }
};

export default DiscountReducer;
