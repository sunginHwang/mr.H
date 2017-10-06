import React from 'react';

import './BckListTitle.css';
const BckListTitle = ({title, completeDate}) => {

    return(
            <p>{title} ({completeDate})</p>
    );
};
export default BckListTitle;