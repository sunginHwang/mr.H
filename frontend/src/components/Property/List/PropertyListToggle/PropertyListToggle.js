import React from 'react';
import ToggleTap from 'components/common/Header/ToggleTap';


const PropertyListToggle = ({
    onToggleClick,
    toggleMode
}) => {
    return (
            <ToggleTap
                leftToggleValue='진행중'
                rightToggleValue='완료'
                onLeftClick={(e)=>{onToggleClick('proceeding')}}
                onRightClick={(e)=>{onToggleClick('complete')}}
                toggleActive={toggleMode === 'complete' ? 'right' : 'left'}
                activeColor='ocean'
            />
    );
};

export default PropertyListToggle;