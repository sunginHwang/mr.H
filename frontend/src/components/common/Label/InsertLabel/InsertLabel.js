import React from 'react';
import './InsertLabel.css';
const InsertLabel = ({
    labelName,
    children
}) => {
  return (
      <div className='InsertLabel'>
          <label className='InsertLabel-label'>
              {labelName}
          </label>
          {children}
      </div>
  );
};
 
export default InsertLabel;