import React from 'react';
import './ToggleTap.css';

const ToggleTap = ({
    leftToggleValue,
    rightToggleValue,
    onLeftClick,
    onRightClick,
    toggleActive,
    activeColor
}) => {
  const leftActiveMode  = toggleActive === 'left'&&  activeColor;
  const rightActiveMode =   toggleActive === 'right'&&  activeColor;
  return (
      <div className='ToggleTap'>
          <div className={'ToggleTap-tap ToggleTap-left ' + leftActiveMode }
               onClick={onLeftClick}
          >
              {leftToggleValue}
          </div>
          <div className={'ToggleTap-tap ToggleTap-right ' + rightActiveMode}
               onClick={onRightClick}
          >
              {rightToggleValue}
          </div>
      </div>
  );
};
 
export default ToggleTap;