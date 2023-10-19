import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddEditBlog from './pages/AddEditBlog';
import NotFound from './pages/NotFound';
import About from './pages/About';

import Auth from './pages/Auth';
import Detail from './pages/Detail';

import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

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
      navigate('/auth');
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

      <Routes>
        <Route path='/' element={<Home setActive={setActive} user={user} />} />
        <Route
          path='/addBlog'
          element={<AddEditBlog user={user} setActive={setActive} />}
        />

        <Route
          path='/editBlog/:id'
          element={<AddEditBlog user={user} setActive={setActive} />}
        />

        <Route
          path='/detail/:id'
          element={<Detail setActive={setActive} user={user} />}
        />

        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth setActive={setActive} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
