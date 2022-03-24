import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constants/CartConstants';

export const addTocart = (id, qty) => async (disptch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  disptch({
    type: CART_ADD_ITEM,
    payload: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
