import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TopNavBar = ({ showButton }) => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <FontAwesomeIcon icon={faPlayCircle} />
        <span className="font-light ml-2 tracking-widest text-xl tracking-tight">
          MUSIC MENTORING
        </span>
      </div>
      {showButton ? (
        <Link to="/student-dashboard">
          <p className="btn right-0">Home</p>
        </Link>
      ) : null}
    </nav>
  );
};

export default TopNavBar;
