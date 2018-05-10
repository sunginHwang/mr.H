import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({headerLeftValue,
                       headerRightValue,
                       contentValue,
                       complete,
                       sideValue
                            }) => {
    return (
        <div className={'property-card'+ ( complete ? ' property-card-complete' : '')}>
            <div className='property-card-header'>
                <div className='property-card-left' >{headerLeftValue}</div>
                <div className='property-card-right'>{headerRightValue}</div>
            </div>
            <div className='property-card-content' >
                <div className='property-card-content-value property-card-right'>{contentValue}</div>
            </div>
            <div className='property-card-footer' style={{clear:'both'}}>
                <div className='property-card-footer-value'><span>{sideValue}</span></div>
            </div>
        </div>
    );
};

export default PropertyCard;