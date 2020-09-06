import React from 'react';

const StaticText = ({ m, idx }) => {
  return (
    <div className="tracking-widest font-light text-center m-2 mt-6">
      <div className="bg-gray-700 text-white m-auto p-2 shadow rounded">
        {m.content}
      </div>
    </div>
  );
};

export default StaticText;
