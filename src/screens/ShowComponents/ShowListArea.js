import React from 'react';

const ShowListArea = ({ m, textcolor }) => {
  return (
    <div
      className="w-4/5 rounded bg-gray-300 opacity-75 mx-auto my-4 text-center p-3 tracking-widest"
      style={{ color: `${textcolor}` }}
    >
      <h1 className="text-l">{m.question}</h1>
      {m.answer[0] === '' ? (
        <p className="text-red-700 mt-2 font-light">
          Question not answered yet
        </p>
      ) : (
        <ul>
          {m.answer.map((a, index) => {
            return (
              <li className="text-base font-light mt-2" key={index}>
                &#9834; - {a}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ShowListArea;
