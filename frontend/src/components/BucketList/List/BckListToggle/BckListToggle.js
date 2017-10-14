import React from 'react';
import ToggleTap from 'components/common/Tap/ToggleTap';


const BckListToggle = ({
    onToggleClick,
    toggleMode
}) => {
  return (
    <div className="bck-toggle-tap">
        <ToggleTap
            leftToggleValue='진행중'
            rightToggleValue='완료'
            onLeftClick={(e)=>{onToggleClick('proceeding')}}
            onRightClick={(e)=>{onToggleClick('complete')}}
            toggleActive = {toggleMode == 'complete' ? 'right' : 'left'}
            activeColor='ocean'
        />
    </div>
  );
};

export default BckListToggle;