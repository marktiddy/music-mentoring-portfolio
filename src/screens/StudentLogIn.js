import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../data/keys';
import { studentAcc } from '../data/student';
import md5 from 'md5';
import { MainContext } from '../Context/MainContext';
import { motion } from 'framer-motion';
import { containerVariants } from '../animation/motionSettings';
import Logo from '../components/logo';

const StudentLogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    error,
    setError,
    setCurrentUserType,
    setCurrentUser,
    setCurrentStudent,
  } = useContext(MainContext);
  const history = useHistory();

  const signInFailed = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('userType');
        localStorage.removeItem('timeSaved');
        localStorage.removeItem('user');
        setError('Username or Password do not match');
        setPassword('');
      });
  };

  const compareStudents = (hashPass) => {
    //Connext to firebase and get the student lists so we can compare

    firebase
      .firestore()
      .collection('mentees')
      .get()
      .then((snapshot) => {
        const allUsers = [];
        snapshot.forEach((doc) => {
          allUsers.push(doc.data());
        });
        //Now we have all our users let's compare
        const ourUser = allUsers.filter((m) => m.username === username);

        if (ourUser[0]) {
          //We have a matched user...let's compare the password
          if (ourUser[0].password === hashPass) {
            console.log('we have a match');
            //Match
            setCurrentStudent({
              username: ourUser[0].username,
              friendlyname: ourUser[0].friendlyname,
            });
            localStorage.setItem('friendlyname', ourUser[0].friendlyname);
            localStorage.setItem('studentusername', ourUser[0].username);
            setPassword('');

            history.push('/student-dashboard');
          } else {
            //no match
            signInFailed();
          }
        } else {
          signInFailed();
        }
      });
  };

  const handleForm = (event) => {
    event.preventDefault();
    setError(null);
    const hashPass = md5(password);
    //Log into firebase student account
    firebase
      .auth()
      .signInWithEmailAndPassword(
        studentAcc.username + '@musicmentoring.live',
        studentAcc.password
      )
      .then((data) => {
        //We're into the admin account so let's save the admin stuff to local storage and update context
        //We'll undo this if the student doesn't match in the next step
        setCurrentUserType('student');
        setCurrentUser(data.user);
        localStorage.setItem('userType', 'student');
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('timeSaved', new Date().getTime());
      })
      .then(() => {
        compareStudents(hashPass);
      })
      .catch((error) => {
        console.log(error);
        setError('We had a problem signing you in');
      });
  };

  const sendUserBack = (event) => {
    event.preventDefault();
    history.push('/');
  };

  return (
    <div className="flex content-center bg-gray-100 h-screen">
      <motion.div
        className="m-auto w-2/3 p-8 bg-gray-700 rounded-sm shadow-lg text-center"
        variants={containerVariants}
        animate="visible"
        initial="hidden"
      >
        <Logo displayText={'MENTEE LOG IN'} />

        <form className="w-full text-center pt-6" onSubmit={handleForm}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-white font-light tracking-widest py-2 text-lg">
                Username
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="mentee-username"
                type="text"
                placeholder="markhoppus"
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
                id="mentee-password"
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
              <input className="btn ml-0" type="submit" value="Log In" />
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
  );
};

export default StudentLogIn;
