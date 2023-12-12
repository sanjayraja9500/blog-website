import React from 'react';

import { Link } from 'react-router-dom';
import { RiAccountPinCircleLine } from 'react-icons/ri';

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <div
      style={{ backgroundColor: '#444' }}
      className=' flex justify-evenly   h-20 p-2 '
    >
      <div className=' text-black flex flex-row justify-start items-center '>
        <Link to='/home' className='max-sml:hidden'>
          <img
            className='h-10 w-10 p bg-transparent absolute top-3 left-3'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDudJst-bD3ls6arZ7My5RUsScphJQXsqlwB3Dl3N6G9SJz8gaHfOL8fuVCqjPQlJMU3c&usqp=CAU'
            alt='logo'
          />{' '}
        </Link>
      </div>

      <div className='flex justify-around items-center gap-6 font-semibold text-xl  '>
        <div className='flex flex-row  justify-around gap-10 max-sml:font-thin max-sml:flex max-sml:gap-2 '>
          <div>
            <Link to='/home' className='text-white '>
              Home
            </Link>
          </div>
          <div onClick={() => setActive('addBlog')}>
            <Link className='text-white' to='/addBlog'>
              Add Blog
            </Link>
          </div>
          <div className='' onClick={() => setActive('about')}>
            <Link to='/about' className='text-white'>
              About
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-row justify-center items-center gap-4 font-semibold text-xl  max-sml:font-thin max-sml:flex max-sml:gap-2'>
          {userId ? (
            <>
              <Link to='/profile'>
                <div className='flex gap-2 justify-center items-center'>
                  <RiAccountPinCircleLine className='text-white text-3xl ' />
                  <p className='text-center mt-3 tracking-wide text-white'>
                    Profile
                  </p>
                </div>
              </Link>

              <Link to='/'>
                <p
                  className='text-white text-xl mt-3 ml-10 text-end'
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </Link>
            </>
          ) : (
            <Link
              onClick={() => setActive('login')}
              to='/'
              style={{
                color: '#fff',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
