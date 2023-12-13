import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddEditBlog from './pages/AddEditBlog';
import NotFound from './pages/NotFound';
import About from './pages/About';
import { ToastContainer, toast } from 'react-toastify';

import Detail from './pages/Detail';

import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

import Registration from './pages/Registration';
import Profile from './pages/Profile';
import Login from './pages/Login';

const App = () => {
  const [active, setActive] = useState('home');

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive('login');
      navigate('/');
      toast.success('Logout Successfully');
    });
  };

  return (
    <div className='App'>
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        Draggable
        pauseOnHovertheme='dark'
      />
      <Routes>
        <Route path='/' element={<Login setActive={setActive} />} />
        <Route
          path='/home'
          element={
            user && user.uid ? (
              <Home setActive={setActive} active={active} user={user} />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/search'
          element={<Home setActive={setActive} user={user} />}
        />

        <Route
          path='/addBlog'
          element={
            user && user.uid ? (
              <AddEditBlog user={user} setActive={setActive} />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/editBlog/:id'
          element={
            user && user.uid ? (
              <AddEditBlog user={user} setActive={setActive} />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/detail/:id'
          element={<Detail setActive={setActive} user={user} />}
        />
        <Route
          path='/about'
          element={user && user.uid ? <About /> : <Navigate to='/' />}
        />
        <Route
          path='/registration'
          element={<Registration setActive={setActive} user={user} />}
        />
        <Route
          path='/profile'
          element={<Profile setActive={setActive} user={user} />}
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
