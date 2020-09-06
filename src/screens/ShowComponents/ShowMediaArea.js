import React from 'react';
import ReactPlayer from 'react-player';

const ShowMediaArea = ({ m, textcolor }) => {
  const { mediaURL, mediaCaption, mediaType } = m;
  const mainuser = JSON.parse(localStorage.getItem('user'));

  return (
    <div
      className="w-4/5 rounded bg-gray-300 opacity-75 mx-auto my-4 text-center p-3 tracking-widest"
      style={{ color: `${textcolor}` }}
    >
      <h1 className="text-l">{m.question}</h1>
      {!m.mediaURL ? (
        <p className="text-red-700 mt-2 font-light">
          Question not answered yet
        </p>
      ) : (
        <>
          {mainuser.email.split('@')[0] === 'print' ? null : (
            <ReactPlayer
              url={mediaURL}
              className="text-center p-2 m-auto rounded"
              controls={true}
              height={mediaType === 'audio' ? 20 : 'auto'}
              width={'full'}
            />
          )}
          <div className="p-4">
            <a
              href={mediaURL}
              target="_blank"
              className="btn text-white bg-gray-800 hover:text-gray-800 capitalize"
            >
              Download the {mediaType} file
            </a>
          </div>
        </>
      )}
      {mediaCaption ? (
        <p className="text-base font-light italic">{mediaCaption}</p>
      ) : null}
    </div>
  );
};

export default ShowMediaArea;
