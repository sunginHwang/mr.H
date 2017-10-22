import React from 'react';
import './InputLabel.css';

const InputLabel = ({
    labelName,
    placeHolderName,
    onInputChange,
    inputValue,
    inputType
}) => {
  return (
      <div className='input-label-row'>
          <label className='input-label'>
              {labelName}
          </label>
          <input className='input-label-input'
                 type={inputType}
                 placeholder={placeHolderName}
                 onChange={onInputChange}
                 value={inputValue}
          />
      </div>
  );
};
 
export default InputLabel;