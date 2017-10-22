import React from 'react';
import ToggleTap from 'components/common/Tap/ToggleTap';


const PropertyListToggle = ({
    onToggleClick,
    toggleMode
}) => {
    return (
        <div className="bck-toggle-tap">
            <ToggleTap
                leftToggleValue='적급진행내역'
                rightToggleValue='적급완료내역'
                onLeftClick={(e)=>{onToggleClick('proceeding')}}
                onRightClick={(e)=>{onToggleClick('complete')}}
                toggleActive={toggleMode === 'complete' ? 'right' : 'left'}
                activeColor='ocean'
            />
        </div>
    );
};

export default PropertyListToggle;