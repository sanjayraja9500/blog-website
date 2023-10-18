import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import MostPopular from '../components/MostPopular';

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, 'blogs', id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };
  return (
    <div className='single relative h-full w-[90%] items-center text-base bg-orange-200 m-10'>
      <div className='blog-title-box   bg-cover bg-no-repeat bg-center'>
        <img
          className='w-[80%] ml-20 mt-5 items-center'
          src={blog?.imgUrl}
          alt={blog?.title}
        />

        <div className='blog-title z-6 absolute  w-full pl-20 pb-4 ml-18 mt-2'>
          <span>{blog?.timestamp.toDate().toDateString()} </span>
          <h2 className='text-black font-bold text-4xl pb-0 mt-2'>
            {blog?.title}
          </h2>
        </div>
      </div>
      <div className='md:container  pb-4 pt-4 blog-single-content'>
        <div className='container px-0'>
          <div className='row mx-0'>
            <div className=''>
              <div className='block uppercase text-base tracking-wider '>
                <span
                  className='meta-info text-1xl text-black
              font-extrabold no-underline block  text-end '
                >
                  <p
                    className='author 
                  inline-block font-extrabold text-sm'
                  >
                    By {blog?.author}
                  </p>
                  -&nbsp;
                  {blog?.timestamp.toDate().toDateString()}
                </span>
              </div>
              <p className='text-start pt-6 text-2xl ml-20'>
                {blog?.description}
              </p>
            </div>
            <Link
              to='/'
              className=' flex items-center justify-center  mt-3
            '
            >
              <BsFillArrowLeftSquareFill
                size='35px'
                className=' cursor-pointer '
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
