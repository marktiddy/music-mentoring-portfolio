import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../data/keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import md5 from 'md5';
import { motion } from 'framer-motion';
import { containerVariants } from '../../animation/motionSettings';

const UpdateStudent = () => {
  const [userList, setUserList] = useState(null);
  const [userIds, setUserIds] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

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
        setUserIds(ids);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const setSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleForm = (event) => {
    event.preventDefault();
    //Hash the new password
    const hashpassword = md5(password);
    //Get the idea of the user we're updating (the doc name)
    const idx = userList.indexOf(selectedUser);
    firebase
      .firestore()
      .collection('mentees')
      .doc(userIds[idx])
      .update({
        password: hashpassword,
      })
      .then(() => {
        setMessage('Update Successful');
        setPassword('');
        setSelectedUser(null);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
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
          UPDATE MENTEE PASSWORD
        </div>
        <div className="text-white text-center text-l font-light tracking-widest font-thin mt-3">
          Select a mentee to change their password
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
        {message ? (
          <div className="text-center text-yellow-300 text-xl font-light tracking-widest font-thin">
            {message}
          </div>
        ) : null}
        {selectedUser ? (
          <div className="text-white text-center text-xl font-light tracking-widest font-thin">
            <form
              className="w-full text-center pt-3"
              onSubmit={handleForm}
              id="update-password-form"
            >
              <div className="text-center mt-3">
                <label className="text-m tracking-widest font-thin">
                  Enter new password for {selectedUser}
                </label>
              </div>
              <div className="text-white text-center text-l font-light tracking-widest font-thin mt-3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700  mr-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="create-password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                />
                <input
                  className="btn ml-0 text-base "
                  type="submit"
                  value="Update Password"
                />
              </div>
            </form>
          </div>
        ) : null}
        <div className="">
          <Link to="/dashboard">
            <p className="btn">Back to Dashboard</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateStudent;
