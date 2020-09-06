import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../data/keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { containerVariants } from '../../animation/motionSettings';

const DeleteStudent = () => {
  const [userList, setUserList] = useState(null);
  const [userIds, setUserIds] = useState(null);
  const [usernames, setUsernames] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menteeToRemove, setMenteeToRemove] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  const findImageURLs = (portfolio) => {
    const imgUrls = [];
    portfolio.portfolio.partA.content.forEach((p) => {
      if (p.type === 'image') {
        imgUrls.push(p.imageName);
      }
    });
    portfolio.portfolio.partB.content.forEach((p) => {
      if (p.type === 'image') {
        imgUrls.push(p.imageName);
      }
    });
    portfolio.portfolio.partC.content.forEach((p) => {
      if (p.type === 'image') {
        imgUrls.push(p.imageName);
      }
    });
    portfolio.portfolio.partD.content.forEach((p) => {
      if (p.type === 'image') {
        imgUrls.push(p.imageName);
      }
    });
    return imgUrls;
  };

  const deleteImages = (imageName) => {
    var imgRef = firebase.storage().ref('portfolio_uploads').child(imageName);
    imgRef
      .delete()
      .then(() => {
        //file was deleted
      })
      .catch((e) => console.log(e));
  };

  const handleDelete = (mentee) => {
    const studentToRemove = mentee;
    if (!showModal) {
      //User hasn't been warned
      setMenteeToRemove(studentToRemove);
      setShowModal(!showModal);

      return;
    } else {
      //Warning has been shown so we can delete
      //Hide Modal
      setShowModal(!showModal);
      //Get their portfolio
      const idx = userList.indexOf(studentToRemove);
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
          //We want to go through their portfolio and find any images
          //Now delete the images from firebase
          const imgNames = findImageURLs(portfolio);
          imgNames.forEach((i) => {
            if (i) {
              deleteImages(i);
            }
          });
        })
        .then(() => {
          //Now images are removed we want to delete the user's portfolio
          firebase
            .firestore()
            .collection('portfolios')
            .doc(docId)
            .delete()

            .catch((e) => console.log(e));
        })
        .then(() => {
          //Finally, delete the user themselves
          firebase
            .firestore()
            .collection('mentees')
            .doc(docId)
            .delete()
            .then(() => {
              setSuccessMessage(
                `The account for ${studentToRemove} was deleted`
              );
              setTimeout(() => {
                setSuccessMessage(null);
                setMenteeToRemove(null);
              }, 3500);
            });
        })
        .catch((e) => console.log(e));
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setMenteeToRemove(null);
  };

  return (
    <>
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

          <div className="text-red-700 bg-white rounded mt-2 text-center text-xl font-light tracking-widest font-thin">
            DELETE A MENTEE
          </div>
          <div className="text-white text-center text-l font-light tracking-widest font-thin mt-3">
            To delete a mentee including their username, portfolio and uploaded
            media click the button next to their name.
          </div>
          {successMessage ? (
            <div className="bg-green-700 text-white mt-4 rounded tracking-widest font-light text-lg">
              {successMessage}
            </div>
          ) : null}
          <div className="text-white text-center text-xl font-light tracking-widest font-thin mt-3 mb-6">
            {userList
              ? userList.map((m) => {
                  return (
                    <div
                      className="flex items-center text-l font-light -mb-3"
                      key={m}
                    >
                      <div className="flex-1 text-white text-right">{m}</div>
                      <div className="flex-1 text-gray-700 text-center py-2 m-2">
                        <p
                          className="btn text-sm p-1 m-2 bg-red-700 text-white hover:text-red-700 hover:bg-white w-3/5"
                          onClick={() => handleDelete(m)}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          <div className="">
            <Link to="/dashboard">
              <p className="btn">Back to Dashboard</p>
            </Link>
          </div>
        </motion.div>
      </div>
      {showModal ? (
        <div className="w-full h-full  mx-auto absolute top-0 z-40 right-0 content-center flex">
          <div className="m-auto w-3/5 p-8 bg-red-700 text-white rounded-sm shadow-lg text-center h-auto opacity-100 tracking-widest font-light text-lg font-light">
            Are you sure you want to delete {menteeToRemove}?
            <p className="italic text-base font-light mt-2">
              Warning: This cannot be undone
            </p>
            <div className="mt-6">
              <span
                className="btn bg-white text-red-700 hover:bg-white hover:text-red-700 hover:bg-opacity-75"
                onClick={() => cancelDelete()}
              >
                Back
              </span>
              <span
                className="btn bg-white text-red-700 hover:bg-white hover:text-red-700 hover:bg-opacity-75"
                onClick={() => handleDelete(menteeToRemove)}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteStudent;
