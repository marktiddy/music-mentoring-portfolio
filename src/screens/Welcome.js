import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerVariants } from '../animation/motionSettings';
import Logo from '../components/logo';

const Welcome = () => {
  const history = useHistory();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType) {
      if (userType === 'admin') {
        history.push('/dashboard');
      } else if (userType === 'student') {
        history.push('/student-dashboard');
      }
    }
  }, [history]);

  return (
    <div className="flex content-center bg-gray-100 h-screen">
      <motion.div
        className="m-auto w-2/3 p-8 bg-gray-700 rounded-sm shadow-lg text-center"
        variants={containerVariants}
        animate="visible"
        initial="hidden"
        exit="exit"
      >
        <Logo displayText={'PORTFOLIO PORTAL'} />
        <div className="text-center mt-6">
          <Link to="/student-sign-in" className="btn">
            Log in as Mentee
          </Link>
        </div>{' '}
        <div className="text-center mt-8">
          <Link
            id="mentor-login"
            to="/mentor-sign-in"
            className="transition duration-500 ease-in-out bg-gray-300 px-4 py-2 m-4 rounded-sm text-center tracking-widest uppercase text-gray-700 hover:bg-gray-100 shadow-md"
          >
            Log in as Mentor
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
