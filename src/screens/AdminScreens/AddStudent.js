import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import firebase from '../../data/keys';
import { portfolio_qs as portfolio } from '../../data/portfolio_questions.js';
import md5 from 'md5';
import { motion } from 'framer-motion';
import { containerVariants } from '../../animation/motionSettings';

const AddStudent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [usernameError, setUsernameError] = useState(null);
  const [error, setError] = useState(null);
  const [listOfUsernames, setListOfUsernames] = useState();
  const [showForm, setShowForm] = useState(true);

  //Firebase stuff
  //Get a list of usernames and save to state
  //Set to do this once
  useEffect(() => {
    var unsubscribe = firebase
      .firestore()
      .collection('mentees')
      .onSnapshot((snapshot) => {
        const usernames = [];
        snapshot.forEach((doc) => {
          usernames.push(doc.data());
        });
        setListOfUsernames(
          usernames.map((item) => item.username.toLowerCase())
        );
      });
    return () => unsubscribe();
  }, []);

  //Function to handle our form
  const handleForm = (event) => {
    event.preventDefault();

    //Check username has no white space
    if (username.split('').indexOf(' ') !== -1) {
      setUsernameError('Error: Username cannot contain spaces');
    } else {
      //No white spaces
      //Check for duplicate usernames
      if (listOfUsernames.indexOf(username.toLowerCase()) !== -1) {
        setUsernameError('This username already exists');
        return;
      }
      //Now we're here we have a unique, spaceless username...lets has a password
      const hashPass = md5(password);
      //Call up firebase and save the data
      //Create new docs for portfolio and mentees
      let menteeDocId;
      //Refactured code start
      //Add mentee
      firebase
        .firestore()
        .collection('mentees')
        .add({
          username: username,
          password: hashPass,
          friendlyname: name,
        })
        .then((doc) => {
          menteeDocId = doc.id;
        })
        .then(() => {
          //We want to add our new portfolio
          firebase.firestore().collection('portfolios').doc(menteeDocId).set({
            username,
            portfolio,
          });
        })
        .then(() => {
          //this all worked
          setShowForm(false);
          setUsernameError(null);
          setPassword('');
          setUsername('');
        })
        .catch((e) => {
          setError('Something went wrong. Please try again');
        });
    }
  };

  //Function to reset the form to create another
  const resetForm = () => {
    setShowForm(true);
    setUsername('');
    setPassword('');
    setName('');
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
          ADD NEW MENTEE
          <br />
          <br />
        </div>
        {showForm ? (
          <div className="text-white text-center text-l font-light tracking-widest font-thin">
            To create a new mentee add a username, name and password below. The
            username cannot contain spaces. It's also recommended that you
            choose a password the mentee doesn't use on other platforms.
          </div>
        ) : null}

        {showForm ? (
          <form
            className="w-full text-center pt-6"
            onSubmit={handleForm}
            id="create-student-form"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-white font-light tracking-widest py-2 text-lg">
                  Username
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="create-username"
                  type="text"
                  placeholder="markhoppus"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            {usernameError ? (
              <div className="md:flex md:items-center mb-4">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3 text-left bg-red-800 text-white rounded-sm p-1 tracking-wider font-light">
                  {usernameError} <br />
                </div>
              </div>
            ) : null}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-white font-light tracking-widest py-2 text-lg">
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="create-name"
                  type="text"
                  placeholder="Mark Hoppus"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-white font-light tracking-widest py-2 text-lg">
                  Set Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="create-password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                />
              </div>
            </div>
            {error ? (
              <div className="md:flex md:items-center mb-4">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3 text-left bg-red-800 text-white rounded-sm p-1 tracking-wider font-light">
                  {error} <br />
                </div>
              </div>
            ) : null}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3 text-left">
                <input
                  className="btn ml-0"
                  type="submit"
                  value="Create New Mentee Account"
                />
              </div>
            </div>
          </form>
        ) : (
          <>
            <div className="text-white text-center text-l font-light tracking-widest font-thin">
              All done! Account created for for {name}
            </div>
            <div className="">
              <button className="btn" onClick={resetForm}>
                Create Another Mentee Account
              </button>
            </div>
          </>
        )}
        <br />
        <div className="">
          <Link to="/dashboard">
            <p className="btn">Back to Dashboard</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AddStudent;
