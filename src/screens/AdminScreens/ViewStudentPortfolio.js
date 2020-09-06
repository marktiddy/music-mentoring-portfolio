import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import firebase from '../../data/keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { containerVariants } from '../../animation/motionSettings';

const ViewStudentPortfolio = () => {
  const [userList, setUserList] = useState(null);
  const [userIds, setUserIds] = useState(null);
  const [usernames, setUsernames] = useState(null);
  const history = useHistory();

  //Get list of users

  useEffect(() => {
    //Firebase stuff
    //Get a list of usernames and save to state
    var unsubscribe = firebase
      .firestore()
      .collection('mentees')
      .onSnapshot((snapshot) => {
        const usernames = [];
        const ids = [];
        snapshot.forEach((doc) => {
          usernames.push(doc.data());
          ids.push(doc.id);
        });
        setUserList(usernames.map((item) => item.friendlyname));
        setUsernames(usernames.map((item) => item.username));
        setUserIds(ids);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const setSelect = (event) => {
    const selectedStudent = event.target.value;
    //Get the docId of the user
    const idx = userList.indexOf(selectedStudent);
    const docId = userIds[idx];
    const username = usernames[idx];
    let portfolio;
    //Now get the data from firebase
    firebase
      .firestore()
      .collection('portfolios')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().username === username) {
            portfolio = doc.data();
          }
        });
      })
      .then(() => {
        if (portfolio) {
          //Remove any existing friendly name and add new one ready for View component
          localStorage.removeItem('friendlyname');
          localStorage.setItem('friendlyname', selectedStudent);
          history.push({
            pathname: '/dashboard/view/portfolio',
            state: {
              docId: docId,
              portfolio: portfolio,
            },
          });
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex content-center bg-gray-100 h-screen">
      <motion.div
        variants={containerVariants}
        animate="visible"
        initial="hidden"
        className="m-auto w-2/3 p-8 bg-gray-700 rounded-sm shadow-lg text-center h-auto"
      >
        <h1 className="text-4xl text-white tracking-widest font-light">
          <FontAwesomeIcon icon={faPlayCircle} /> MUSIC MENTORING
        </h1>

        <div className="text-white text-center text-xl font-light tracking-widest font-thin">
          VIEW MENTEE PORTFOLIO
        </div>
        <div className="text-white text-center text-l font-light tracking-widest font-thin mt-3">
          Choose a mentee to view their portfolio
        </div>
        <div className="text-white text-center text-xl font-light tracking-widest font-thin mt-3 mb-6">
          <select
            id="students"
            className=" appearance-none w-3/5 bg-gray-200 border border-gray-200 text-base text-gray-600 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={setSelect}
          >
            <option value="">Choose a Mentee</option>
            {userList
              ? userList.map((m) => {
                  return (
                    <option value={m} key={m}>
                      {m}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        <div className="">
          <Link to="/dashboard" id="go-to-portfolio">
            <p className="btn">Back to Dashboard</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewStudentPortfolio;
