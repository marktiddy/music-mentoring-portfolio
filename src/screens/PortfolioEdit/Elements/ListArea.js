import React from 'react';

const ListArea = ({ m, idx, updateMultipleInput }) => {
  return (
    <div
      key={m.question}
      className="tracking-widest font-light text-center m-2 mt-6"
    >
      <div>
        <label className="font-normal">{m.question}</label>
        {m.tip ? (
          <label className="text-sm">
            <br /> {m.tip}
          </label>
        ) : null}
      </div>
      <div>
        {m.answer.map((m, index) => {
          return (
            <textarea
              cols="50"
              rows={m.size}
              placeholder="Add your answer here"
              key={index}
              value={m}
              onChange={(event) => updateMultipleInput(event, index, idx)}
              className="w-4/5 bg-gray-200 text-gray-700 border border-gray-700 rounded focus:outline-none focus:bg-gray-100 tracking-widest font-light p-2 mt-2 mb-2"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListArea;
