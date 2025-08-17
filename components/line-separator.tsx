import React from 'react';

const LineSeparator = () => {
  return (
    <div className="w-full border-t-2 border-gray-300 my-8 relative">
      <div className="absolute left-0 top-0 w-full h-full shadow" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}></div>
    </div>
  );
};

export default LineSeparator;
