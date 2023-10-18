import React from 'react';
import { Link } from 'react-router-dom';
import { excerpt } from '../utility';

import { BsTrashFill } from 'react-icons/bs';
import { BiSolidEdit } from 'react-icons/bi';

const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <div>
      <div className='text-4xl font-extrabold text-orange-700  border-y-4 border-orange-700 text-start py-2 mb-4'>
        Online Journals!...
      </div>
      {blogs?.map((item) => (
        <div className='row pb-4' key={item.id}>
          <div className='col-md-5'>
            <div className=' -top-7 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'>
              <div className=' img h-51 rounded-md overflow-hidden relative t-0 shadow-md transition-all'>
                <img
                  className='h-64 min-w-full'
                  src={item.imgUrl}
                  alt={item.title}
                />
                <div></div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='text-start'>
              <h6 className='inline-block relative bg-blue-200 py-1 px-1 text-gray-900 no-underline catg-color text-base normal-case leading-4 font-bold rounded'>
                {item.category}
              </h6>
              <span
                className='text-base text-black
              font-extrabold no-underline block py-2'
              >
                {item.title}
              </span>
              <span className='text-sm text-gray-400 block no-underline'>
                <p className='inline-block font-extrabold text-sm'>
                  {item.author}
                </p>{' '}
                -&nbsp;
                {item.timestamp.toDate().toDateString()}
              </span>
            </div>
            <div className='short-description text-sm text-gray-700 text-start'>
              {excerpt(item.description, 120)}
            </div>
            <Link to={`/detail/${item.id}`}>
              <button
                className='btn bg-black

            text-white hover:bg-gray-700 duration-300 py-1.5 px-2.5 float-left mt-2.5 text-sm'
              >
                Read More
              </button>
            </Link>
            {user?.uid && item.userId === user.uid && (
              <div className='float-right flex '>
                <BsTrashFill
                  className='m-3.5 cursor-pointer'
                  onClick={() => handleDelete(item.id)}
                />

                <Link to={`/editBlog/${item.id}`}>
                  <BiSolidEdit className=' m-3.5 cursor-pointer' />
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSection;
