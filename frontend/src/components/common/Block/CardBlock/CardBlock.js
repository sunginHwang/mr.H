import React from 'react';
import './CardBlock.css';

const CardBlock = ({
    headerTitle,
    headerSubArea,
    children
}) => {
  return (
    <div className="common-card-block">
        <div className="card-block-header">
            <span className="header-title">
                {headerTitle}
            </span>
            <div className="header-sub-area">
                {headerSubArea}
            </div>
        </div>
        <div className="card-block-body">
            {children}
        </div>
    </div>
  );
};
 
export default CardBlock;