import {connect} from 'react-redux';
import HomeComponent from '../screens/components/HomeComponent';
import {
  increaseQuantityAction,
  decreaseQuantityAction,
  getAllCategoriesAction,
  increaseDiscountAction,
  decreaseDiscountAction,
} from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    quantity: state.QuantityReducer ? state.QuantityReducer : 1,
    categories_list: state.CategoriesReducer ? state.CategoriesReducer : [],
    discount: state.DiscountReducer ? state.DiscountReducer : 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncreamentQuantity: (step) => {
      dispatch(increaseQuantityAction(step));
    },
    onDecreamentQuantity: (step) => {
      dispatch(decreaseQuantityAction(step));
    },
    getAllCategories: () => {
      dispatch(getAllCategoriesAction());
    },
    onIncreamentDiscount: (step) => {
      dispatch(increaseDiscountAction(step));
    },
    onDecreamentDiscount: (step) => {
      dispatch(decreaseDiscountAction(step));
    },
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);

export default HomeContainer;
