import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../data/keys';
import { motion } from 'framer-motion';
import { containerVariants } from '../animation/motionSettings';
import Logo from '../components/logo';

const StudentDashboard = () => {
  const [studentPortfolio, setStudentPortflio] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [portfolioId, setPortfolioId] = useState(null);

  useEffect(() => {
    //Populate our friendly name from local storage
    const friendly = localStorage.getItem('friendlyname');
    setCurrentStudent(friendly);

    //Get our portfolio from firebase
    const uname = localStorage.getItem('studentusername');

    var unsubscribe = firebase
      .firestore()
      .collection('portfolios')
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().username === uname) {
            setStudentPortflio(doc.data());
            setPortfolioId(doc.id);
          }
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex content-center bg-gray-100 h-screen">
      <motion.div
        className="m-auto w-2/3 p-8 bg-gray-700 rounded-sm shadow-lg text-center h-auto"
        variants={containerVariants}
        animate="visible"
        initial="hidden"
      >
        <Logo
          displayText={`Welcome back ${currentStudent ? currentStudent : null}`}
        />

        <div className="text-white text-center text-xl font-light tracking-widest font-thin">
          <br />
          What do you want to do today?
        </div>
        <div className="">
          <Link
            to={{
              pathname: '/student-dashboard/edit-portfolio',
              state: {
                docId: portfolioId,
                portfolio: studentPortfolio,
              },
            }}
          >
            <p className="btn">Continue working on my portfolio</p>
          </Link>

          <Link
            to={{
              pathname: '/student-dashboard/view-portfolio',
              state: {
                docId: portfolioId,
                portfolio: studentPortfolio,
              },
            }}
          >
            <p className="btn">View and Print my portfolio</p>
          </Link>

          <Link to="/signout">
            <p className="btn">Log Out</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
