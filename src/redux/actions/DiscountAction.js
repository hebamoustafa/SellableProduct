import {INCREAMENT_DISCOUNT, DECREAMENT_DISCOUNT} from '../constants';

export const increaseDiscountAction = (step) => {
  return {
    type: INCREAMENT_DISCOUNT,
    step: step,
  };
};

export const decreaseDiscountAction = (step) => {
  return {
    type: DECREAMENT_DISCOUNT,
    step: step,
  };
};
