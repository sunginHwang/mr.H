import React from 'react';

import './BckLstListTitle.css';
const BckLstListTitle = ({title, completeDate}) => {

    return(
            <p>{title} ({completeDate})</p>
    );
};
export default BckLstListTitle;