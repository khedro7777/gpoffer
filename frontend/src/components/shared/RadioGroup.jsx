import React from 'react';

const RadioGroup = ({ label, options, name, selectedOption, onChange }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="flex flex-col">
        {options.map((option, index) => (
          <label key={index} className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name={name}
              value={option}
              checked={selectedOption === option}
              onChange={onChange}
            />
            <span className="ml-2 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;


