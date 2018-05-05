import React from 'react';
import './BottomTwoButton.css';

const BottomTwoButton = ({
    onLeftBtnClick,
    leftBtnName,
    leftColor,
    onRightBtnClick,
    rightBtnName,
    rightColor,
}) => {
  return (
      <div className={'BottomTwoButton'}>
          {
              leftBtnName != '' &&
              <div className={'BottomTwoButton-two-button ' + leftColor} onClick={onLeftBtnClick}>
                  {leftBtnName}
              </div>
          }
          {
              rightBtnName != '' &&
              <div className={'BottomTwoButton-two-button ' + rightColor} onClick={onRightBtnClick}>
                  {rightBtnName}
              </div>
          }
      </div>
  );
};
 
export default BottomTwoButton;