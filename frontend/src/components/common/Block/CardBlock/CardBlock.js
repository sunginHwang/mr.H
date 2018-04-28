import React from 'react';
import './CardBlock.css';

const CardBlock = ({
    headerTitle,
    headerSubArea,
    radius,
    children
}) => {
    let cardBlockHeader = '';
    if( headerTitle != null && headerTitle != ''){
        cardBlockHeader = <div className='CardBlock-header'>
                                    <span className='CardBlock-header-title'>
                                        {headerTitle}
                                    </span>
            <div className='CardBlock-header-sub-area'>
                {headerSubArea}
            </div>
        </div>;
    }

    return (
    <div className={radius == true ? 'CardBlock '+'Radius-Block'
                                   : 'CardBlock'}>
        {cardBlockHeader}
        <div className='CardBlock-body'>
            {children}
        </div>
    </div>
  );
};
 
export default CardBlock;