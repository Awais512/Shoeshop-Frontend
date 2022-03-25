import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailsReducer,
  productListReducer,
} from './Reducers/ProductReducer';
import { cartReducer } from './Reducers/CartReducer';
import { userLoginReducer } from './Reducers/UserReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromLocalstorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalstorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
