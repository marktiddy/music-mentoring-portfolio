import React from 'react';

const Textarea = ({ m, idx, section, updateTextField }) => {
  return (
    <div
      key={m.question}
      className="tracking-widest font-light text-center m-2 mt-6"
    >
      <div>
        <label className="font-normal">{m.question}</label>
        {m.tip ? (
          <label className="text-sm">
            <br /> {m.tip}
          </label>
        ) : null}
      </div>

      <div className="mt-4">
        <textarea
          name={m.question}
          className="w-4/5 bg-gray-200 text-gray-700 border border-gray-700 rounded focus:outline-none focus:bg-gray-100 tracking-widest font-light p-2"
          rows={m.size}
          cols="50"
          value={section.answer}
          onChange={(event) => updateTextField(event, idx)}
          placeholder="Add your answer here"
        />
      </div>
    </div>
  );
};

export default Textarea;
