import React from 'react';
import './CardBlock.css';

const CardBlock = ({
    headerTitle,
    headerSubArea,
    radius,
    children
}) => {
  return (
    <div className={radius == true ? 'CardBlock '+'Radius-Block'
                                   : 'CardBlock'}>
        <div className='CardBlock-header'>
            <span className='CardBlock-header-title'>
                {headerTitle}
            </span>
            <div className='CardBlock-header-sub-area'>
                {headerSubArea}
            </div>
        </div>
        <div className='CardBlock-body'>
            {children}
        </div>
    </div>
  );
};
 
export default CardBlock;