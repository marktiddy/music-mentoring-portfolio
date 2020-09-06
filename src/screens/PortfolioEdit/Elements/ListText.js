import React from 'react';

const ListText = ({ m, idx }) => {
  const title = m.title;
  return (
    <div className="tracking-widest font-light text-center m-2 mt-6">
      <div className="bg-gray-700 text-white m-auto p-2 shadow rounded text-lg">
        {m.title}
        {m.tip ? (
          <label className="text-sm">
            <br /> {m.tip}
          </label>
        ) : null}
      </div>
      <div className="bg-gray-700 text-white mx-auto shadow rounded flex mb-4 flex-wrap text-base align-middle justify-center">
        {m.content.map((m, index) => {
          return (
            <div
              key={index}
              className={`sm:w-1/3 w-full bg-gray-700 text-white p-2 text-base text-center ${
                title === 'A few ideas...' ? 'italic' : null
              }`}
            >
              {m}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListText;
