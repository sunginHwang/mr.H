import React from 'react';
import './CardItem.css';

const CardItem = ({
    title,
    subTitle,
    extInfo,
    extColor
}) => {
  return (
    <div className='CardItem'>
      <div className='CardItem-info'>
        <span className='CardItem-info-title'>
            {title}
        </span><br/>
        <span className='CardItem-info-sub-title'>
            {subTitle}
        </span>
      </div>
      <div className='CardItem-info-ext'>
        <span className={extColor}>{extInfo}</span>
      </div>

    </div>
  );
};
 
export default CardItem;