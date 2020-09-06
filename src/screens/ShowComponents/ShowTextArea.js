import React from 'react';

const ShowTextArea = ({ m, textcolor }) => {
  return (
    <div
      className="w-4/5 rounded bg-gray-300 opacity-75 mx-auto my-4 text-center p-3 tracking-widest"
      style={{ color: `${textcolor}` }}
    >
      <h1 className="text-l">{m.question}</h1>
      {m.answer === '' ? (
        <p className="text-red-700 mt-2 font-light">
          Question not answered yet
        </p>
      ) : (
        <p className="text-base font-light mt-2">{m.answer}</p>
      )}
    </div>
  );
};

export default ShowTextArea;
