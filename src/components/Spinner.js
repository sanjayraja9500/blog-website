import React from 'react';

const Spinner = () => {
  return (
    <div
      className='spinner-border text-primary mt-8 spinner h-8 w-8 text-center'
      role='status'
    >
      <span className='visually-hidden'>Loading...</span>
    </div>
  );
};

export default Spinner;
