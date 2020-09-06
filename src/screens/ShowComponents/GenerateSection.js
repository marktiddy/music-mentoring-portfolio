import React from 'react';
//Components
import ShowTextArea from './ShowTextArea';
import ShowImageArea from './ShowImageArea';
import ShowListArea from './ShowListArea';
import ShowChoicesArea from './ShowChoicesArea';
import ShowMediaArea from './ShowMediaArea';

const GenerateSection = ({ section, textcolor }) => {
  return (
    <>
      <div
        className="w-4/5 rounded bg-gray-300 opacity-75 mx-auto my-4 text-center p-3 section-start"
        style={{ color: `${textcolor}` }}
      >
        <h1 className="text-xl tracking-widest pt-2 ">{section.title}</h1>
        <p className="text-center text-l tracking-widest font-light">
          {section.description}
        </p>
      </div>
      {section.content.map((m, index) => {
        if (m.type === 'textarea') {
          return <ShowTextArea m={m} textcolor={textcolor} key={m.question} />;
        } else if (m.type === 'image') {
          return <ShowImageArea m={m} textcolor={textcolor} key={m.question} />;
        } else if (m.type === 'media') {
          return <ShowMediaArea m={m} textcolor={textcolor} key={m.question} />;
        } else if (m.type === 'list') {
          return <ShowListArea m={m} textcolor={textcolor} key={m.question} />;
        } else if (m.type === 'choice') {
          return (
            <ShowChoicesArea m={m} textcolor={textcolor} key={m.question} />
          );
        } else if (m.type === 'listarea') {
          return <ShowListArea m={m} textcolor={textcolor} key={m.question} />;
        } else {
          return <div key={index + 23} />;
        }
      })}
    </>
  );
};

export default GenerateSection;
