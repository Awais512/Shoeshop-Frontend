import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SiNGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
} from '../Constants/ProductConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SiNGLE_PRODUCT_REQUEST:
      return { ...state, loading: true, product: {} };
    case SINGLE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case SINGLE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
