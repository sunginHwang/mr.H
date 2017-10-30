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
      <div className={'common-two-bottom-button'}>
        <div className={'two-button ' + leftColor} onClick={onLeftBtnClick}>
            {leftBtnName}
        </div>
          <div className={'two-button ' + rightColor} onClick={onRightBtnClick}>
              {rightBtnName}
          </div>
      </div>
  );
};
 
export default BottomTwoButton;