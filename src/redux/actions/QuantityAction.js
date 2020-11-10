import {INCREAMENT_QUANTITY, DECREAMENT_QUANTITY} from '../constants';

export const increaseQuantityAction = (step) => {
  return {
    type: INCREAMENT_QUANTITY,
    step: step,
  };
};

export const decreaseQuantityAction = (step) => {
  return {
    type: DECREAMENT_QUANTITY,
    step: step,
  };
};
