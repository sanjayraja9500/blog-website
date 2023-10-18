import React from 'react';
import { useNavigate } from 'react-router-dom';

const MostPopular = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='blog-heading text-start text-2xl font-extrabold text-orange-700 border-b-4 border-orange-700  pt-3 py-2 mb-4'>
        Popular Blogs
      </div>
      {blogs?.map((item) => (
        <div
          className='row pb-3 cursor-pointer'
          key={item.id}
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <div className='col-5 align-self-center'>
            <img className='h-20 w-full' src={item.imgUrl} alt='{item.title}' />{' '}
          </div>
          <div className='col-7 p-8'>
            <div className='text-start font-medium  most'>{item.title}</div>
            <div className='text-start most-meta text-base text-indigo-900'>
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MostPopular;
