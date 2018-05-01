import React from 'react';
import './SlideModalLabel.css';

const SlideModalLabel = ({title, onLabelClick }) => {
    return (
        <div className='slide-label'
            onClick={onLabelClick}>
            {title}
        </div>
    );
};

export default SlideModalLabel;