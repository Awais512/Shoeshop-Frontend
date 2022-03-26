import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../LoadingError/Toast';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../Redux/Actions/UserActions';

const ProfileTabs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toastId = React.useRef(null);

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error('Password does not match', ToastObjects);
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(
          'Profile Updated Successfully',
          ToastObjects
        );
      }
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant='alert-danger'>{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className='row  form-container' onSubmit={submitHandler}>
        <div className='col-md-6'>
          <div className='form'>
            <label for='account-fn'>UserName</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-control'
              type='text'
              required
            />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form'>
            <label for='account-email'>E-mail Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control'
              type='email'
              required
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form'>
            <label for='account-pass'>New Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='form-control'
              type='password'
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form'>
            <label for='account-confirm-pass'>Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='form-control'
              type='password'
            />
          </div>
        </div>
        <button type='submit'>Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
