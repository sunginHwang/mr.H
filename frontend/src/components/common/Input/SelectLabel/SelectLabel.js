import React from 'react';
import InsertLabel from 'components/common/Label/InsertLabel';
import './SelectLabel.css';



const SelectLabel = ({
    labelName,
    onSelectChange,
    optionList
}) => {
  return (

      <InsertLabel
          labelName={labelName}>
          <select className='SelectLabel'
                  onChange={onSelectChange}>
              {optionList}
          </select>
      </InsertLabel>
  );
};
 
export default SelectLabel;