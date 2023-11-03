import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import BlogSection from '../components/BlogSection';
import Spinner from '../components/Spinner';
import {
  deleteDoc,
  doc,
  orderBy,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import MostPopular from '../components/MostPopular';
import Search from '../components/Search';
import { useLocation } from 'react-router-dom';
import { isNull, isEmpty } from 'lodash';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ setActive, user, active }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');

  const queryString = useQuery();
  const searchQuery = queryString.get('searchQuery');
  const location = useLocation();

  useEffect(() => {
    setSearch('');
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
  }, [setActive, active]);

  const searchBlogs = async () => {
    const blogRef = collection(db, 'blogs');
    const searchTitleQuery = query(blogRef, where('title', '==', searchQuery));
    const searchCategoryQuery = query(
      blogRef,
      where('category', '==', searchQuery)
    );
    const titleSnapshot = await getDocs(searchTitleQuery);
    const categorySnapshot = await getDocs(searchCategoryQuery);
    let searchTitleBlogs = [];
    let searchCategoryBlogs = [];

    titleSnapshot.forEach((doc) => {
      searchTitleBlogs.push({ id: doc.id, ...doc.data() });
    });
    categorySnapshot.forEach((doc) => {
      searchTitleBlogs.push({ id: doc.id, ...doc.data() });
    });
    const combineSearchBlogs = searchTitleBlogs.concat(searchCategoryBlogs);
    setBlogs(combineSearchBlogs);
  };

  useEffect(() => {
    if (!isNull(searchQuery)) {
      searchBlogs();
    }
  }, [searchQuery]);

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

  const getBlogs = async () => {
    const blogRef = collection(db, 'blogs');

    const docSnapshot = await getDocs(blogRef);
    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      getBlogs();
    }
    setSearch(value);
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

          <Search search={search} handleChange={handleChange} />

          <div className='col-md-8'>
            <div className='ml-3 text-rose-500'>
              {blogs.length === 0 && location.pathname !== '/' && (
                <>
                  <h4>No Blog found with search keyword</h4>
                  <strong className='text-fuchsia-600 capitalize'>
                    "{searchQuery}"
                  </strong>
                </>
              )}
            </div>
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
    </div>
  );
};

export default Home;
