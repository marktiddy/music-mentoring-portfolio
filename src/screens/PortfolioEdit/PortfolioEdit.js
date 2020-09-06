import React, { useState } from 'react';
import TopNavBar from '../Components/TopNavBar';
import PortfolioEditForm from './PortfolioEditForm';
import firebase from '../../data/keys';
import { motion } from 'framer-motion';
import { containerVariants } from '../../animation/motionSettings';

const PortfolioEdit = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [timeLastSaved, setTimeLastSaved] = useState(null);
  const [saveFeedback, setSaveFeedback] = useState(null);
  //Get our doc ID from our props
  const { docId } = props.location.state;
  const { portfolio } = props.location.state;
  //Get the friendly name
  const friendlyName = localStorage.getItem('friendlyname');
  //Destructure
  const {
    portfolio: { partA, partB, partC, partD },
  } = portfolio;

  const calculateProgress = (section) => {
    let totalSections = 0;
    let completeSections = 0;
    //This is passed a section
    section.forEach((a) => {
      //Check we have an answer category
      switch (a.type) {
        case 'textarea':
          totalSections = totalSections + 1;
          if (a.answer !== '') {
            completeSections = completeSections + 1;
          }
          break;
        case 'image':
          totalSections = totalSections + 1;
          if (a.imageCaption) {
            completeSections = completeSections + 1;
          }
          break;
        case 'media':
          totalSections = totalSections + 1;
          if (a.mediaCaption) {
            completeSections = completeSections + 1;
          }
          break;
        case 'list':
        case 'listarea':
          totalSections = totalSections + 1;

          if (a.answer.indexOf('') === -1) {
            if (a.answer.indexOf('1. ') !== -1) {
              break;
            }
            completeSections = completeSections + 1;
          }
          break;
        case 'choice':
          totalSections = totalSections + 1;
          const checkedItems = a.options.filter((c) => c.isChecked === true);

          if (checkedItems[0]) {
            completeSections = completeSections + 1;
          }
          break;
        default:
          break;
      }
    });

    return Math.floor((completeSections / totalSections) * 100);
  };

  const portfolioSections = [
    {
      title: partA.title,
      desc: partA.description,
      status: calculateProgress(partA.content),
    },
    {
      title: partB.title,
      desc: partB.description,
      status: calculateProgress(partB.content),
    },
    {
      title: partC.title,
      desc: partC.description,
      status: calculateProgress(partC.content),
    },
    {
      title: partD.title,
      desc: partD.description,
      status: calculateProgress(partD.content),
    },
  ];

  const handleChoice = (choice) => {
    const editedChoice = choice.replace(' ', '').slice(0, 5);
    switch (editedChoice) {
      case 'PartA':
        setSectionToEdit(partA);
        setShowButton(false);
        break;
      case 'PartB':
        setSectionToEdit(partB);
        setShowButton(false);
        break;
      case 'PartC':
        setSectionToEdit(partC);
        setShowButton(false);
        break;
      case 'PartD':
        setSectionToEdit(partD);
        setShowButton(false);
        break;
      default:
        break;
    }
    setIsEditing(true);
  };

  const saveToFirebase = (newData) => {
    const editedPortfolio = portfolio;
    const editedChoice = sectionToEdit.title.replace(' ', '').slice(0, 5);
    switch (editedChoice) {
      case 'PartA':
        editedPortfolio.portfolio.partA = newData;
        break;
      case 'PartB':
        editedPortfolio.portfolio.partB = newData;
        break;
      case 'PartC':
        editedPortfolio.portfolio.partC = newData;
        break;
      case 'PartD':
        editedPortfolio.portfolio.partD = newData;
        break;
      default:
        break;
    }

    //Save our data to firebase

    firebase
      .firestore()
      .collection('portfolios')
      .doc(docId)
      .set(editedPortfolio)
      .then(() => {
        //Set our time saved stamp
        setTimeLastSaved(new Date().getTime());
        setSaveFeedback('Save Successful');
        setTimeout(() => {
          setSaveFeedback(null);
        }, 3000);
      })
      .catch((e) => console.log('error here' + e));
  };

  const saveData = (newData, buttonPressed = false) => {
    //Check we have data
    if (newData) {
      //Check if the button was pressed (if it's not we dont want to save)
      if (buttonPressed) {
        //User wanted to save
        saveToFirebase(newData);
        return;
      }

      //User didn't hit save to lets see the time difference
      if (!timeLastSaved) {
        //never saved so we save
        saveToFirebase(newData);
        return;
      } else {
        //Check our time difference
        const now = new Date().getTime();
        if (now - timeLastSaved > 80000) {
          saveToFirebase(newData);
        }
      }
      //Check the last time saved and if there was 1 minute difference
    }
  };

  const backButtonPressed = (newData) => {
    saveData(newData, true);
    setShowButton(true);
    setSectionToEdit(null);
    setIsEditing(false);
  };

  return (
    <>
      <TopNavBar showButton={showButton} />
      <div className=" content-center  h-auto">
        <motion.div
          className="m-4 text-center text-gray-700"
          variants={containerVariants}
          animate="visible"
          initial="hidden"
        >
          <h1 className="font-light tracking-widest text-2xl text-center">
            {friendlyName}'s Mentoring Portfolio
          </h1>
          {!isEditing ? (
            <>
              <h1 className="font-light tracking-widest text-l text-center">
                Choose a section to edit
              </h1>
              {!portfolio ? (
                <h1 className="pt-20 font-light text-lg text-center tracking-wider">
                  Loading portfolio...
                </h1>
              ) : (
                portfolioSections.map((m) => {
                  return (
                    <div
                      key={m.title}
                      className="btn hover:text-gray-200 hover:bg-gray-700"
                      onClick={() => handleChoice(m.title)}
                    >
                      <h1 className="text-xl">{m.title}</h1>
                      <p className="normal-case">{m.desc}</p>
                      <div className="shadow w-4/5 bg-gray-200 h-4 mx-auto mb-2 mt-4">
                        <div
                          className="bg-gray-800 text-xs py-1 h-4 text-center text-white tracking-widest"
                          style={{ width: `${m.status}%` }}
                        ></div>
                      </div>
                      <div className="text-center text-sm">
                        Section is {m.status}% complete
                      </div>
                    </div>
                  );
                })
              )}
            </>
          ) : (
            <PortfolioEditForm
              sectionToEdit={sectionToEdit}
              saveData={saveData}
              backButtonPressed={backButtonPressed}
              saveFeedback={saveFeedback}
            />
          )}
        </motion.div>
      </div>
    </>
  );
};

export default PortfolioEdit;
