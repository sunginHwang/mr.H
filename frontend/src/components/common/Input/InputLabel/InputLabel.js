import React from 'react';
import InsertLabel from 'components/common/Label/InsertLabel';
import './InputLabel.css';

const InputLabel = ({
    labelName,
    placeHolderName,
    onInputChange,
    inputValue,
    inputType
}) => {
  return (
      <InsertLabel
         labelName={labelName}>
        <input className='InputLabel'
                type={inputType}
                placeholder={placeHolderName}
                onChange={onInputChange}
                value={inputValue}/>
      </InsertLabel>
  );
};
 
export default InputLabel;