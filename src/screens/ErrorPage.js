import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex content-center bg-gray-100 h-screen">
      <div className="m-auto w-2/3 p-8 bg-gray-700 rounded-sm shadow-lg text-center">
        <h1 className="text-4xl text-white tracking-widest font-light">
          MUSIC MENTORING
        </h1>
        <div className="text-white text-center text-xl font-light tracking-widest uppercase">
          Portfolio Portal
          <br />
        </div>
        <div className="text-white text-center text-xl font-light tracking-widest uppercase">
          Oops...we hit a bum note...that page doesn't exist
        </div>
        <div className="text-center mt-6">
          <Link to="/" className="btn">
            Return to home...
          </Link>
        </div>{' '}
      </div>
    </div>
  );
};

export default ErrorPage;
