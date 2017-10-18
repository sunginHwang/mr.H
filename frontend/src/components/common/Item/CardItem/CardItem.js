import React from 'react';
import './CardItem.css';

const CardItem = ({
    title,
    subTitle,
    extInfo,
    extColor
}) => {
  return (
    <div className="common-card-item">
      <div className="card-item-info">
        <span className="card-info-title">
            {title}
        </span><br/>
        <span className="card-info-sub-title">
            {subTitle}
        </span>
      </div>
      <div className="card-info-ext">
        <span className={extColor}>{extInfo}</span>
      </div>

    </div>
  );
};
 
export default CardItem;