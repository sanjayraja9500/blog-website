import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = ({ setActive }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        setActive('Home');
      } else {
        return toast.error('All fields are Mandatory to fill');
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password doesn't match");
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        setActive('Home');
      } else {
        return toast.error('All fields are Mandatory to fill');
      }
    }
    navigate('/');
  };
  return (
    <div className='container-fluid mb-4 mt-24 '>
      <div className='container bg-gradient-to-r from-blue-500 to-transparent '>
        <div className='col-12 text-center'>
          <div className='text-center text-orange-500 heading py-2 text-3xl text-extrabold'>
            {!signUp ? 'Sign-In' : 'Sign-Up'}
          </div>
        </div>
        <div className='row h-100 justify-content-center align-items-center'>
          <div className='col-10 col-md-8 col-g-6'>
            <form className='row' onSubmit={handleAuth}>
              {signUp && (
                <>
                  <div className='col-6 py-3'>
                    <input
                      type='text'
                      className='form-control input-text-box text-[15px]h-[45px] tracking-normal'
                      placeholder='First Name'
                      name='firstName'
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='col-6 py-3'>
                    <input
                      type='text'
                      className='form-control input-text-box text-[15px]h-[45px] tracking-normal'
                      placeholder='Last Name'
                      name='lastName'
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className='col-12 py-3'>
                <input
                  type='email'
                  className='form-control input-text-box text-[15px]h-[45px] tracking-normal'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div className='col-12 py-3'>
                <input
                  type='password'
                  className='form-control input-text-box'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {signUp && (
                <div className='col-12 py-3'>
                  <input
                    type='password'
                    className='form-control input-text-box'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className='col-12 py-3 text-center'>
                <button
                  className={`btn ${!signUp ? 'btn-sign-in' : 'btn-sign-up'}`}
                  type='submit'
                  style={{
                    background: '#c43421',
                    color: '#ffff',
                    padding: '10px 50px',
                  }}
                >
                  {!signUp ? 'Sign-in' : 'Sign-up'}
                </button>
              </div>
            </form>
            <div>
              {!signUp ? (
                <>
                  <div className='text-center justify-content-center mt-2 pt-2'>
                    <p className='small fwbold mt-2 pt-1 mb-0'>
                      Don't have an account ? &nbsp;
                      <span
                        className='link-danger'
                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                        onClick={() => setSignUp(true)}
                      >
                        Sign Up
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className='text-center justify-content-center mt-2 pt-2'>
                    <p className='small fwbold mt-2 pt-1 mb-0'>
                      Already have an account ? &nbsp;
                      <span
                        style={{
                          textDecoration: 'none',
                          cursor: 'pointer',
                          color: '#298af2',
                        }}
                        onClick={() => setSignUp(false)}
                      >
                        Sign In
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        Draggable
        pauseOnHovertheme='dark'
      />
    </div>
  );
};

export default Auth;
