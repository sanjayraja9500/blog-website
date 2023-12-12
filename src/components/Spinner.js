import React from 'react';

const Spinner = () => {
  return (
    <div
      className='spinner-border text-primary mt-8 spinner h-8 w-8  '
      role='status'
    >
      <span className='visually-hidden  flex justify-center items-center text-fuchsia-400'>
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
