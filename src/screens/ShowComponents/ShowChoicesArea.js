import React from 'react';

const ShowChoicesArea = ({ m, textcolor }) => {
  const { options } = m;
  const optionsToShow = options.filter((o) => o.isChecked);

  return (
    <div
      className="w-4/5 rounded bg-gray-300 opacity-75 mx-auto my-4 text-center p-3 tracking-widest"
      style={{ color: `${textcolor}` }}
    >
      <h1 className="text-l">{m.question}</h1>
      {optionsToShow.length === 0 ? (
        <p className="text-red-700 mt-2 font-light">
          Question not answered yet
        </p>
      ) : (
        <ul>
          {optionsToShow.map((i, index) => {
            return (
              <li className="font-light" key={index}>
                &#9834; {i.choice}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ShowChoicesArea;
