import React from 'react';
import './CardItem.css';

const CardItem = ({
    title,
    subTitle,
    extInfo
}) => {
  return (
    <div className="common-card-item">
      <div className="card-item-info">
        <span className="card-info-title">
            {title}
        </span>
        <span className="card-info-sub-title">
            {subTitle}
        </span>
      </div>
      
      <div className="card-info-ext">
        <span>{extInfo}</span>
      </div>

    </div>
  );
};
 
export default CardItem;