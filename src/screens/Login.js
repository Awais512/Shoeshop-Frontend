import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';
import { login } from '../Redux/Actions/UserActions';

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  return (
    <>
      <Header />
      <div className='container d-flex flex-column justify-content-center align-items-center login-center'>
        {error && <Message variant='alert-danger'>{error}</Message>}
        {loading && <Loading />}
        <form
          onSubmit={submitHandler}
          className='Login col-md-8 col-lg-4 col-11'
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
          <button type='submit'>Login</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
