import React from 'react';
import './SaveButton.css';

const SaveButton = ({
    saveButtonName,
    onSaveClick,
    color
}) => {
  return (
    <div className={'common-save-button' + ' ' + color}
         onClick={onSaveClick}
    >
        {saveButtonName}
    </div>
  );
};
 
export default SaveButton;