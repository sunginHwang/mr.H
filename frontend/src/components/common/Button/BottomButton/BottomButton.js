import React from 'react';
import './BottomButton.css';

const BottomButton = ({
    bottomButtonName,
    onButtonClick,
    color
}) => {
  return (
    <div className={'BottomButton ' + color}
         onClick={onButtonClick}
    >
        {bottomButtonName}
    </div>
  );
};
 
export default BottomButton;