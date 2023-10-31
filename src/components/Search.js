import React from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ search, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form
      className=' flex justify-center items-center mb-5'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        vale='search'
        className='w-2/4 h-10  border-solid border-2 border-gray-600 rounded text-base font-semibold'
        placeholder='Search Blogs...!'
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
