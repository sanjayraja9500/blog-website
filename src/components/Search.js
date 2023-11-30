import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RiFileSearchFill } from 'react-icons/ri';

const Search = ({ search, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className=''>
      <form
        className=' flex justify-center items-center mb-5 '
        onSubmit={handleSubmit}
      >
        <Link to='/home'>
          <BsFillArrowLeftSquareFill className='h-8 w-10 text-black' />
        </Link>
        <input
          type='text'
          value={search}
          className='w-2/4 h-10  border-solid border-2 border-gray-600 rounded text-base font-semibold capitalize'
          placeholder='..Search Blogs..!'
          onChange={handleChange}
        />
        <RiFileSearchFill className='h-10 w-10 text-black' />
      </form>
    </div>
  );
};

export default Search;
