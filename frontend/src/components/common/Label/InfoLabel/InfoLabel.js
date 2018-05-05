import React from 'react';
import './InfoLabel.css';
const InfoLabel = ({value, color }) => {
    return (
        <div className={'Info-label ' + (color ? color : '')}>
            {value}
        </div>
    );
};

export default InfoLabel;