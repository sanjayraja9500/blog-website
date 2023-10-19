import React from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <div>
      <MDBNavbar
        expand='lg'
        light
        style={{
          backgroundColor: '#444',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img
              className='h-10 w-10 bg-transparent'
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDudJst-bD3ls6arZ7My5RUsScphJQXsqlwB3Dl3N6G9SJz8gaHfOL8fuVCqjPQlJMU3c&usqp=CAU'
              alt='logo'
            />
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            style={{ color: '#444' }}
            onClick={() => setActive(!active)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse active={active} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 g-8'>
              <MDBNavbarItem className='' onClick={() => setActive('home')}>
                <MDBNavbarLink
                  aria-current='page'
                  href='/'
                  style={{ color: '#fff' }}
                >
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className='' onClick={() => setActive('addBlog')}>
                <MDBNavbarLink
                  href='/addBlog'
                  style={{
                    color: '#fff',
                  }}
                >
                  Add Blog
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className='' onClick={() => setActive('about')}>
                <MDBNavbarLink href='/about' style={{ color: '#fff' }}>
                  About
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
          <MDBNavbarItem className='flex flex-row justify-center items-center gap-4'>
            {userId ? (
              <>
                <div>
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
                <Link to='./auth'>
                  <p className='text-white text-xl mt-2' onClick={handleLogout}>
                    Logout
                  </p>
                </Link>
              </>
            ) : (
              <MDBNavbarLink
                onClick={() => setActive('login')}
                href='./auth'
                style={{
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                Login
              </MDBNavbarLink>
            )}
          </MDBNavbarItem>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Header;
