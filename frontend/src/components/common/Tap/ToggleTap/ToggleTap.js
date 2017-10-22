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
      <div className='toggle-tap-wrapper'>
          <div className={'toggle-tap toggle-left ' + leftActiveMode }
               onClick={onLeftClick}
          >
              {leftToggleValue}
          </div>
          <div className={'toggle-tap toggle-right ' + rightActiveMode}
               onClick={onRightClick}
          >
              {rightToggleValue}
          </div>
      </div>
  );
};
 
export default ToggleTap;