import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './../components/Header';
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';
import { register } from '../Redux/Actions/UserActions';

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Username'
          />
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

          <button type='submit'>Register</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
