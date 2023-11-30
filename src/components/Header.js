import React from 'react';

import { Link } from 'react-router-dom';

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <div className=' flex justify-evenly  bg-blue-500 h-20 p-2 '>
      <div className=' text-black flex flex-row justify-start items-center '>
        <Link to='/home' className='max-sml:hidden'>
          <img
            className='h-10 w-10 p bg-transparent absolute top-3 left-3'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDudJst-bD3ls6arZ7My5RUsScphJQXsqlwB3Dl3N6G9SJz8gaHfOL8fuVCqjPQlJMU3c&usqp=CAU'
            alt='logo'
          />
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
              <div className='  max-sml:ml-5'>
                <img
                  className='w-[30px] -mt-2 h-[30px] rounded  flex justify-center items-center '
                  src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  alt='logo'
                />
              </div>
              <p
                className=' flex justify-center items-center text-xl mt-2 text-white underline
                capitalize'
              >
                {user?.displayName}
              </p>
              <Link to='/'>
                <p className='text-white text-xl mt-2' onClick={handleLogout}>
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
//  <div>
//    <div>
//      <div className='  ml-96 text-center mb-2  gap-16  flex justify-center items-center bg-fixed sm:flex sm:justify-around sm:gap-1'>
//        <div>
//  <Link to='/home'>
//    <img
//      className='h-10 w-10 bg-transparent'
//      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDudJst-bD3ls6arZ7My5RUsScphJQXsqlwB3Dl3N6G9SJz8gaHfOL8fuVCqjPQlJMU3c&usqp=CAU'
//      alt='logo'
//    />
//  </Link>
//        </div>
//        <div
//          className='ml-96 text-center mb-2  gap-16  flex justify-center items-center bg-fixed sm:flex sm:justify-around sm:gap-1'
//          onClick={() => setActive('home')}
//        >
//  <Link to='/home' className='text-white '>
//    Home
//  </Link>
//  <div onClick={() => setActive('addBlog')}>
//    <Link className='text-white' to='/addBlog'>
//      Add Blog
//    </Link>
//  </div>
//  <div className='' onClick={() => setActive('about')}>
//    <Link to='/about' className='text-white'>
//      About
//    </Link>
//          </div>
//        </div>
//      </div>
//    </div>
//  <div className='flex flex-row justify-center items-center gap-4'>
//    {userId ? (
//      <>
//        <div>
//          <img
//            className='w-[30px] -mt-2 h-[30px] rounded  flex justify-center items-center '
//            src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
//            alt='logo'
//          />
//        </div>
//        <p
//          className=' flex justify-center items-center text-xl mt-2 text-white underline
//               capitalize'
//        >
//          {user?.displayName}
//        </p>
//        <Link to='/'>
//          <p className='text-white text-xl mt-2' onClick={handleLogout}>
//            Logout
//          </p>
//        </Link>
//      </>
//    ) : (
//      <Link
//        onClick={() => setActive('login')}
//        to='/'
//        style={{
//          color: '#fff',
//          display: 'flex',
//          flexDirection: 'row',
//        }}
//      >
//        Login
//      </Link>
//    )}
//  </div>
//  </div>;
