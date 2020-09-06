import React, { useState } from 'react';

const Choice = ({ m, idx, updateCheckboxes }) => {
  const [choices] = useState(m.options);

  return (
    <div
      key={m.question}
      className="tracking-widest font-light text-center m-2 mt-6"
    >
      <div>
        <label className="font-normal mb-4">{m.question}</label>
      </div>
      <div className="w-4/5 mx-auto mt-4 flex flex-wrap">
        {choices.map((m, index) => {
          return (
            <label className="flex justify-start items-start sm:w-1/2 w-full flex mb-2">
              <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                <input
                  name={m.choice}
                  key={m.choice}
                  type="checkbox"
                  className="opacity-0 absolute"
                  value={index}
                  checked={m.isChecked}
                  onChange={(event) => updateCheckboxes(event, index, idx)}
                />
                <svg
                  className={`fill-current  w-4 h-4 text-gray-700 pointer-events-none ${
                    m.isChecked ? 'block' : 'hidden'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <div className="select-none">{m.choice}</div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Choice;
//array of m.options
//title m.question
//empty answer value
