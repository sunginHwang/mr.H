import React from 'react';

import './BckListTitle.css';
const BckListTitle = ({
    title,
    completeDate,
    onTitleClick
}) => {

    return(
            <p onClick={onTitleClick}>{title} ({completeDate})</p>
    );
};
export default BckListTitle;