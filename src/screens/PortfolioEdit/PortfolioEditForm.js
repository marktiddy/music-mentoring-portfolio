import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '../../animation/motionSettings';

//Import elements
import Textarea from './Elements/Textarea';
import ListElement from './Elements/ListElement';
import ImageElement from './Elements/ImageElement';
import StaticText from './Elements/StaticText';
import ListText from './Elements/ListText';
import Choice from './Elements/Choice';
import ListArea from './Elements/ListArea';
import MediaElement from './Elements/MediaElement';

const PortfolioEditForm = ({
  sectionToEdit,
  saveData,
  backButtonPressed,
  saveFeedback,
}) => {
  const [section, setSection] = useState();

  useEffect(() => {
    setSection(sectionToEdit);
    return () => saveData(section);
  }, [sectionToEdit, saveData, section]);

  //Not sure we need this!
  const handleForm = (event) => {
    event.preventDefault();
  };

  const updateTextField = (event, index) => {
    //Create copy of questions
    const questions = section.content;
    //Update the specific item
    questions[index].answer = event.target.value;
    //Update the state
    setSection({ ...section, content: questions });
  };

  const updateMultipleInput = (event, index, idx) => {
    //Note - IDX is index of the question and index is for the answer array
    const questions = section.content;
    questions[idx].answer[index] = event.target.value;
    setSection({ ...section, content: questions });
  };

  const updateCheckboxes = (event, index, idx) => {
    //Note IDX is index of question and index is for the answer array
    const questions = section.content;
    questions[idx].options[index].isChecked = !questions[idx].options[index]
      .isChecked;
    setSection({ ...section, content: questions });
  };
  const updateImage = (idx, imageURL, imageCaption, imageName) => {
    //Create copy of questions
    const questions = section.content;
    //Get the right question

    questions[idx].imageCaption = imageCaption;
    questions[idx].imageURL = imageURL;
    questions[idx].imageName = imageName;
    setSection({ ...section, content: questions });
  };

  //Media Function
  const updateMedia = (idx, mediaURL, mediaCaption, mediaName, mediaType) => {
    //Check media type isn't null
    //Create copy of questions
    const questions = section.content;
    //Get the right question

    questions[idx].mediaCaption = mediaCaption;
    questions[idx].mediaURL = mediaURL;
    questions[idx].mediaName = mediaName;
    questions[idx].mediaType = mediaType;
    setSection({ ...section, content: questions });
  };

  return (
    <>
      {section ? (
        <>
          <motion.h1
            variants={containerVariants}
            animate="visible"
            initial="hidden"
            className="tracking-widest text-xl text-center pt-4"
            key="title"
          >
            Editing {section.title}
          </motion.h1>
          <motion.p
            variants={containerVariants}
            animate="visible"
            initial="hidden"
            className="font-light tracking-widest text-center"
          >
            {section.description}
          </motion.p>

          <motion.form
            onSubmit={handleForm}
            variants={containerVariants}
            animate="visible"
            initial="hidden"
          >
            {section.content.map((m, idx) => {
              if (m.type === 'textarea') {
                return (
                  <Textarea
                    idx={idx}
                    m={m}
                    section={section.content[idx]}
                    updateTextField={updateTextField}
                    key={idx}
                  />
                );
              } else if (m.type === 'list') {
                return (
                  <ListElement
                    m={m}
                    idx={idx}
                    updateMultipleInput={updateMultipleInput}
                    key={idx}
                  />
                );
              } else if (m.type === 'image') {
                return (
                  <ImageElement
                    m={m}
                    idx={idx}
                    updateImage={updateImage}
                    key={idx}
                  />
                );
              } else if (m.type === 'media') {
                return (
                  <MediaElement
                    m={m}
                    idx={idx}
                    updateMedia={updateMedia}
                    key={idx}
                  />
                );
              } else if (m.type === 'staticText') {
                return <StaticText m={m} idx={idx} key={idx} />;
              } else if (m.type === 'listText') {
                return <ListText m={m} idx={idx} />;
              } else if (m.type === 'choice') {
                return (
                  <Choice
                    m={m}
                    idx={idx}
                    updateCheckboxes={updateCheckboxes}
                    key={idx}
                  />
                );
              } else if (m.type === 'listarea') {
                return (
                  <ListArea
                    m={m}
                    idx={idx}
                    updateMultipleInput={updateMultipleInput}
                    key={idx}
                  />
                );
              } else {
                return <h2 key={idx}>No text area</h2>;
              }
            })}
          </motion.form>
        </>
      ) : null}
      <motion.div
        className="h-auto w-auto fixed right-0 bottom-0 p-2 mb-4"
        variants={containerVariants}
        animate="visible"
        initial="hidden"
      >
        <p
          className="btn bg-gray-800 text-white hover:bg-gray-200 hover:text-gray-800 -mb-2"
          onClick={() => saveData(section, true)}
        >
          Save
        </p>

        <p
          className="btn bg-gray-800 text-white hover:bg-gray-200 hover:text-gray-800 -mb-2"
          onClick={() => backButtonPressed(section)}
        >
          Back
        </p>
      </motion.div>
      <motion.div className="h-auto w-auto fixed left-0 bottom-0 p-2 mb-4">
        {saveFeedback ? (
          <p className="bg-green-800 text-white p-4 m-4 text-base tracking-widest">
            Portfolio Saved
          </p>
        ) : null}
      </motion.div>
    </>
  );
};

export default PortfolioEditForm;
