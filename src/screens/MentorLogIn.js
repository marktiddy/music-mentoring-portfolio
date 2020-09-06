import React, { useState, useContext } from 'react';
import { MainContext } from '../Context/MainContext';
import { useHistory } from 'react-router-dom';
import firebase, { mainUser, printUser } from '../data/keys';
import { motion } from 'framer-motion';
import { containerVariants } from '../animation/motionSettings';
import Logo from '../components/logo';

const MentorLogIn = () => {
  const { error, setError, setCurrentUser, setCurrentUserType } = useContext(
    MainContext
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleForm = (event) => {
    event.preventDefault();

    //Firebase stuff
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((data) => {
        //Now we want to check if they're the admin and do some set up
        if (data.user.email === mainUser || data.user.email === printUser) {
          setCurrentUserType('admin');
          setCurrentUser(data.user);
          localStorage.setItem('userType', 'admin');
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('timeSaved', new Date().getTime());
        } else {
          setCurrentUserType('student');
          setCurrentUserType(data.user);
          localStorage.setItem('userType', 'student');
          localStorage.setItem('user', data.user);
          localStorage.setItem('timeSaved', new Date().getTime());
        }
        //Reset error
        setError(null);
      })
      .then(() => {
        //Finally, redirect user to dashboard
        history.push('/dashboard');
      })
      .catch((error) => {
        setError('We had a problem signing you in');
      });
  };

  const sendUserBack = (event) => {
    event.preventDefault();
    history.push('/');
  };

  return (
    <>
      <div className="flex content-center bg-gray-100 h-screen">
        <motion.div
          className="m-auto w-2/3 p-8 bg-gray-700 rounded-sm shadow-lg text-center"
          variants={containerVariants}
          animate="visible"
          initial="hidden"
        >
          <Logo displayText={'MENTOR LOG IN'} />

          <form className="w-full text-center pt-6" onSubmit={handleForm}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-white font-light tracking-widest py-2 text-lg">
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="mentor-username"
                  type="email"
                  placeholder="markhoppus@blink182.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-white font-light tracking-widest py-2 text-lg">
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="mentor-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error ? (
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3 text-left bg-red-800 text-white rounded-sm p-1 tracking-wider font-light">
                  {error}
                </div>
              </div>
            ) : null}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3 text-left">
                <input
                  className="btn ml-0"
                  type="submit"
                  value="Log In"
                  id="mentor-login"
                />
                <button
                  className="btn ml-0"
                  onClick={(event) => sendUserBack(event)}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default MentorLogIn;
