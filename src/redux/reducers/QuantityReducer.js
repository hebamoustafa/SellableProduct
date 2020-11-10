import {INCREAMENT_QUANTITY, DECREAMENT_QUANTITY} from '../constants';
import initialState from '../initialState';
const INITIAL_STATE = initialState.quantity;

const QuantityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREAMENT_QUANTITY:
      return state + action.step;
    case DECREAMENT_QUANTITY:
      return state - action.step;
    default:
      return state;
  }
};

export default QuantityReducer;
