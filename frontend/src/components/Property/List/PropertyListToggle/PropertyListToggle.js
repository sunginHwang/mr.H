import React from 'react';
import ToggleTap from 'components/common/Header/ToggleTap';


const PropertyListToggle = ({
    onToggleClick,
    toggleMode
}) => {
    return (
            <ToggleTap
                leftToggleValue='적급진행내역'
                rightToggleValue='적급완료내역'
                onLeftClick={(e)=>{onToggleClick('proceeding')}}
                onRightClick={(e)=>{onToggleClick('complete')}}
                toggleActive={toggleMode === 'complete' ? 'right' : 'left'}
                activeColor='ocean'
            />
    );
};

export default PropertyListToggle;