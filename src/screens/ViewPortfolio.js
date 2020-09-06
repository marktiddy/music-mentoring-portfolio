import React, { useState, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import { CirclePicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../data/keys';
import { motion } from 'framer-motion';
import { containerVariants } from '../animation/motionSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
//import * as html2pdf from 'html2pdf.js';

//Import component to generate sections
import GenerateSection from './ShowComponents/GenerateSection';

//SVG background imports
var GeoPattern = require('geopattern');

const randomLyrics = [
  "Woah...we're halfway there...",
  "I couldn't wait for the summer and the warped tour...",
  "we're going down, down in an earlier round",
  'Can someone please save us from Punk Rock 101?',
  "He's nervous, but on the surface he looks calm and ready",
  "I'm free fallin'",
  "My name's blurry face and I don\t care what you think",
  "Just a small town girl, livin' in a lonely world",
];

//Colors for circle wheel
const colorChoices = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
  '#000000',
  '#ffffff',
];

const ViewPortfolio = (props) => {
  const { docId } = props.location.state;
  const { portfolio } = props.location.state;
  const [bgCol, setBgCol] = useState(null);
  const [txtCol, setTxtCol] = useState(null);
  const [mainTxtCol, setMainTxtCol] = useState(null);
  const [bgimage, setbgimage] = useState(null);
  const [currentuuid, setcurrentuuid] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [saveMessage, setSaveMessage] = useState(null);
  const containerRef = createRef();
  const [isAdmin, setIsAdmin] = useState(false);
  //Portfolio inputs

  const friendlyName = localStorage.getItem('friendlyname');
  const mainuser = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const generateBg = () => {
    const uuid = uuidv4();
    var pattern = GeoPattern.generate(uuid, { color: `${bgCol}` });
    setcurrentuuid(uuid);
    setbgimage(pattern.toDataUrl());
  };

  const regenerateBg = (uuid, col) => {
    var pattern = GeoPattern.generate(`${uuid}`, { color: `${col}` });
    setcurrentuuid(uuid);
    setbgimage(pattern.toDataUrl());
  };

  const updateBgCol = (hex) => {
    if (bgimage) {
      var pattern = GeoPattern.generate(currentuuid, { color: hex });
      setBgCol(hex);
      setbgimage(pattern.toDataUrl());
    } else {
      setBgCol(hex);
    }
  };

  useEffect(() => {
    //Check if we have a style in local storage or online
    //Local storage will always be the most recent save
    //  console.log(portfolio);
    if (localStorage.getItem('userStyle')) {
      const style = JSON.parse(localStorage.getItem('userStyle'));
      setBgCol(style.bgColor);
      setTxtCol(style.textColor);
      setMainTxtCol(style.mainTextColor);
      const uuid = style.uuid;
      regenerateBg(uuid, style.bgColor);
    } else if (portfolio.portfolio.style.uuid) {
      setBgCol(portfolio.portfolio.style.bgColor);
      setTxtCol(portfolio.portfolio.style.textColor);
      setMainTxtCol(portfolio.portfolio.style.mainTextColor);
      const uuid = portfolio.portfolio.style.uuid;
      regenerateBg(uuid, portfolio.portfolio.style.bgColor);
    } else {
      setBgCol('#4a5568');
      setTxtCol('white');
      setMainTxtCol('black');
    }
    //Check if an admin is editing so we can disable customisation and save button
    if (localStorage.getItem('userType') === 'admin') {
      setShowControls(false);
      setIsAdmin(true);
    }
  }, [portfolio]);

  //Firebase function //JUST ADDED A DOT TO PORTFOLIO WAS editedportfolio.style
  const saveColorsToFirebase = (justSaving = false) => {
    const editedPortfolio = portfolio;
    editedPortfolio.portfolio.style = {
      bgColor: bgCol,
      mainTextColor: mainTxtCol,
      textColor: txtCol,
      uuid: currentuuid,
    };
    //Remove old local storage
    localStorage.removeItem('userStyle');
    //Save to local storage
    localStorage.setItem(
      'userStyle',
      JSON.stringify(editedPortfolio.portfolio.style)
    );

    //Save our data to firebase
    firebase
      .firestore()
      .collection('portfolios')
      .doc(docId)
      .set(editedPortfolio)
      .then(() => {
        if (!justSaving) {
          history.push('/');
        } else {
          setSaveMessage('Saved!');
          setTimeout(() => {
            setSaveMessage(null);
          }, 2500);
        }
      })
      .catch((e) => console.log(e));
  };

  const homeButtonPressed = () => {
    saveColorsToFirebase();
  };

  const saveAsPdf = () => {
    const url = `https://us-central1-musicmentoring-portfolio.cloudfunctions.net/api/music-mentoring-portfolio-pdf?name=${friendlyName}`;

    window.open(url);
  };

  //Finally, we don't want to load if colours haven't
  if (!bgCol) {
    return (
      <div className="flex h-screen bg-gray-800">
        <div className="m-auto">
          <h3 className="text-4xl text-white font-light">Loading...</h3>
          <p className="text-2xl text-white font-light">
            {randomLyrics[Math.floor(Math.random() * randomLyrics.length)]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="content-center h-auto m-0 pb-6"
        style={{
          background: bgCol,
          color: txtCol,
          backgroundImage: `${bgimage ? bgimage : 'none'}`,
        }}
        ref={containerRef}
      >
        <div className="m-0 p-4 text-center">
          {' '}
          <h1 className="text-4xl tracking-widest font-light">
            <FontAwesomeIcon icon={faPlayCircle} /> MUSIC MENTORING
          </h1>
          <div className="tracking-widest font-light text-2xl mt-3">
            {friendlyName
              ? `${
                  friendlyName.split('')[friendlyName.split('').length - 1] ===
                  's'
                    ? friendlyName + "' "
                    : friendlyName + "'s "
                }Portfolio`
              : null}
          </div>
        </div>
        <GenerateSection
          section={portfolio.portfolio.partA}
          textcolor={mainTxtCol}
          key="partA"
        />
        <GenerateSection
          section={portfolio.portfolio.partB}
          textcolor={mainTxtCol}
          key="partB"
        />
        <GenerateSection
          section={portfolio.portfolio.partC}
          textcolor={mainTxtCol}
          key="partC"
        />
        <GenerateSection
          section={portfolio.portfolio.partD}
          textcolor={mainTxtCol}
          key="partD"
        />
      </div>
      <div
        className={`h-auto w-auto fixed ml-2 left-0 bottom-0 mb-2 bg-gray-300 rounded ${
          showControls ? 'block' : 'hidden'
        }`}
      >
        <p
          className="btn bg-gray-800 text-white hover:bg-gray-200 text-left pr-2 hover:text-gray-800 text-sm p-1 -mb-2"
          onClick={() => setShowControls(!showControls)}
        >
          Hide Options
        </p>

        <div className="mt-4 text-left tracking-widest text-sm uppercase text-gray-800 mb-2 font-light"></div>
        <div className="text-left ml-4 mt-1">
          <p className="text-gray-800 text-sm uppercase tracking-wider mt-2 mb-2">
            Choose Title Colour
          </p>

          <CirclePicker
            onChangeComplete={(color) => setTxtCol(color.hex)}
            width="220px"
            circleSize={20}
            circleSpacing={8}
            colors={colorChoices}
          />
        </div>
        <div className="text-left ml-4 mt-1">
          <p className="text-gray-800 text-sm uppercase tracking-wider mt-2 mb-2">
            Choose Text Colour
          </p>

          <CirclePicker
            onChangeComplete={(color) => setMainTxtCol(color.hex)}
            width="220px"
            circleSize={20}
            circleSpacing={8}
            colors={colorChoices}
          />
        </div>
        <div className="text-left ml-4 mt-1">
          <p className="text-gray-800 text-sm uppercase tracking-wider mt-2 mb-2">
            Choose Plain Background
          </p>
          <CirclePicker
            onChangeComplete={(color) => updateBgCol(color.hex)}
            width="200px"
            circleSize={20}
            circleSpacing={8}
            colors={colorChoices}
          />
        </div>
        <div className="m-2 text-left mt-4">
          <p
            className="btn bg-gray-800 text-white text-sm font-light hover:bg-gray-300 hover:text-gray-800 p-2 mx-0"
            onClick={generateBg}
          >
            Add Background Pattern
          </p>
        </div>
        <div className="h-2" />
      </div>
      <div
        className={`h-auto w-auto fixed left-0 bottom-0 p-2 mb-4 ${
          showControls ? 'hidden' : 'block'
        } ${isAdmin ? 'hidden' : null}`}
      >
        <p
          className="btn bg-gray-800 text-white hover:bg-gray-200 hover:text-gray-800 text-sm p-1 -mb-2"
          onClick={() => setShowControls(!showControls)}
        >
          Show Options
        </p>
      </div>
      {mainuser.email !== 'print@musicmentoring.live' ? (
        <div
          className={`h-auto w-auto fixed right-0 bottom-0 p-2 mb-4 ${
            showMenu ? 'hidden' : 'block'
          }`}
        >
          <p
            className="btn bg-gray-800 text-white hover:bg-gray-200 hover:text-gray-800 text-sm p-1 -mb-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            Show Menu
          </p>
        </div>
      ) : null}

      {mainuser.email !== 'print@musicmentoring.live' ? (
        <motion.div
          variants={containerVariants}
          animate="visible"
          initial="hidden"
          className={`h-auto w-auto fixed right-0 bottom-0 p-2 mb-4 ${
            showMenu ? 'block' : 'hidden'
          }`}
        >
          <p
            className="btn bg-gray-800 text-white hover:bg-gray-200 text-center pr-2 hover:text-gray-800 text-sm p-1 m-3 -mb-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            Hide Menu
          </p>
          <p
            className="btn bg-gray-800 text-white hover:bg-gray-200 hover:text-gray-800 m-3 -mb-2"
            onClick={() => homeButtonPressed()}
          >
            Home
          </p>
          {!isAdmin ? (
            <p
              className="btn bg-gray-800 text-white hover:bg-gray-200 hover:text-gray-800 m-3 -mb-2"
              onClick={() => saveColorsToFirebase(true)}
            >
              Save Changes
            </p>
          ) : (
            <p
              className="btn bg-gray-800 text-white hover:bg-gray-200 hover:text-gray-800 m-3 -mb-2"
              onClick={() => history.push('/dashboard/view')}
            >
              Back
            </p>
          )}
          {saveMessage ? (
            <motion.p
              variants={containerVariants}
              animate="visible"
              initial="hidden"
              className="btn bg-green-800 text-white hover:bg-green-800 hover:text-white m-3 -mb-2"
            >
              {saveMessage}
            </motion.p>
          ) : null}
          <p
            className="btn bg-gray-800 text-white hover:bg-gray-200 hover:text-gray-800 m-3 -mb-2"
            onClick={() => saveAsPdf()}
          >
            Download as PDF
          </p>
        </motion.div>
      ) : null}
    </>
  );
};

export default ViewPortfolio;
