import React from 'react';

const ShowImageArea = ({ m, textcolor }) => {
  const { imageURL, imageCaption } = m;

  return (
    <div
      className="w-4/5 rounded bg-gray-300 opacity-75 mx-auto my-4 text-center p-3 tracking-widest"
      style={{ color: `${textcolor}` }}
    >
      <h1 className="text-l">{m.question}</h1>
      {!m.imageURL ? (
        <p className="text-red-700 mt-2 font-light">
          Question not answered yet
        </p>
      ) : (
        <img
          src={imageURL}
          alt={imageCaption}
          className="w-full text-center p-2 m-auto rounded"
        />
      )}
      {imageCaption ? (
        <p className="text-base font-light italic">{imageCaption}</p>
      ) : null}
    </div>
  );
};

export default ShowImageArea;
