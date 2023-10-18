import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import BlogSection from '../components/BlogSection';
import Spinner from '../components/Spinner';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import MostPopular from '../components/MostPopular';

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'blogs'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
        setLoading(false);
        setActive('home');
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure want to delete blog ?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'blogs', id));
        toast.success('Blog deleted successfully');
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='container-fluid pb-4 pt-4 padding'>
      <div className='container padding'>
        <div className='row px-0'>
          <div className='flex w-full h-100 items-center justify-center'>
            <img
              className='w-[50%] h-30'
              src='https://t3.ftcdn.net/jpg/03/67/35/72/360_F_367357209_BG07SVnnB4HSHSaMiHajfZhrZZAE859A.jpg'
              alt=''
            />
          </div>
          <div className='col-md-8'>
            <h2 className='text-2xl text-black border-b-2 border-indigo-500'>
              <BlogSection
                blogs={blogs}
                user={user}
                handleDelete={handleDelete}
              />
            </h2>
          </div>
          <div className='col-md-3'>
            <MostPopular blogs={blogs} />
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

export default Home;
