import React from 'react';
import './InsertLabel.css';
const InsertLabel = ({
    labelName,
    children
}) => {
  return (
      <div className='label-wrapper'>
          <label className='label-area'>
              {labelName}
          </label>
          {children}
      </div>
  );
};
 
export default InsertLabel;