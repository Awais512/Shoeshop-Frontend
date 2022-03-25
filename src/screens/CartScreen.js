import React, { useEffect } from 'react';
import Header from './../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart } from '../Redux/Actions/CartActions';

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addTocart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = (e) => {
    e.preventDefault();
    history.push('/login?redirect=shipping');
  };

  const removeFromCartHandler = () => {};

  return (
    <>
      <Header />
      {JSON.stringify(cartItems)}
      {/* Cart */}
      <div className='container'>
        {cartItems.length === 0 ? (
          <div className=' alert alert-info text-center mt-3'>
            Your cart is empty
            <Link
              className='btn btn-success mx-5 px-5 py-3'
              to='/'
              style={{
                fontSize: '12px',
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=' alert alert-info text-center mt-3'>
              Total Cart Products
              <Link className='text-success mx-2' to='/cart'>
                {cartItems.length}
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((cart) => (
              <div className='cart-iterm row'>
                <div
                  onClick={() => removeFromCartHandler()}
                  className='remove-button d-flex justify-content-center align-items-center'
                >
                  <i className='fas fa-times'></i>
                </div>
                <div className='cart-image col-md-3'>
                  <img src={cart.image} alt={cart.name} />
                </div>
                <div className='cart-text col-md-5 d-flex align-items-center'>
                  <Link to={`/products/${cart.product}`}>
                    <h4>{cart.name}</h4>
                  </Link>
                </div>
                <div className='cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center'>
                  <h6>QUANTITY</h6>
                  <select
                    value={cart.qty}
                    onChange={(e) =>
                      dispatch(addTocart(cart.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(cart.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7'>
                  <h6>Price</h6>
                  <h4>${cart.price}</h4>
                </div>
              </div>
            ))}

            <div className='total'>
              <span className='sub'>total:</span>
              <span className='total-price'>${total}</span>
            </div>
            <hr />
            <div className='cart-buttons d-flex align-items-center row'>
              <Link to='/' className='col-md-6 '>
                <button>Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className='col-md-6 d-flex justify-content-md-end mt-3 mt-md-0'>
                  <button onClick={checkoutHandler}>
                    <Link to='/shipping' className='text-white'>
                      Checkout
                    </Link>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {/* <div className=" alert alert-info text-center mt-3">
          Your cart is empty
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            SHOPPING NOW
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default CartScreen;
