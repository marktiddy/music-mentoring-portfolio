import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const Logo = ({ displayText, viewing }) => {
  return (
    <>
      <h1 className="text-4xl text-white tracking-widest font-light">
        <FontAwesomeIcon icon={faPlayCircle} /> MUSIC MENTORING
      </h1>
      <div
        className={`text-white text-center font-light tracking-widest ${
          viewing ? 'text-2xl' : 'text-xl'
        }`}
      >
        {displayText}
      </div>
    </>
  );
};

export default Logo;
