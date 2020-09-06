import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerVariants } from '../animation/motionSettings';
import Logo from '../components/logo';

const Dashboard = () => {
  return (
    <div className="flex content-center bg-gray-100 h-screen">
      <motion.div
        variants={containerVariants}
        animate="visible"
        initial="hidden"
        className="m-auto w-2/3 p-8 bg-gray-700 rounded-sm shadow-lg text-center h-auto"
      >
        <Logo displayText={'Welcome back admin!'} />

        <div className="text-white text-center text-xl font-light tracking-widest font-thin">
          <br />
          What do you want to do today?
        </div>
        <div className="">
          <Link to="/dashboard/add">
            <p className="btn">Add A New Mentee</p>
          </Link>

          <Link to="/dashboard/update">
            <p className="btn">Reset A Mentee's Password</p>
          </Link>
          <Link to="/dashboard/delete">
            <p className="btn">Delete A Mentee</p>
          </Link>

          <Link to="/dashboard/view">
            <p className="btn" id="view-a-portfolio">
              View A Portfolio
            </p>
          </Link>

          <Link to="/signout">
            <p className="btn">Log Out</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
