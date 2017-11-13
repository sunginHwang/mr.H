import React from 'react';
import './ContentList.css'

const ContentList = ({
    left_title,
    right_title,
    style,
    children
}) => {
    return (

    <div className='ContentList_list' style={style}>
        <div>
            <div className='ContentList-left-title'>
                {left_title}
            </div>

            <div className='ContentList-right-title'>
                {right_title}
            </div>
        </div>
        <div className='ContentList_content'>
            {children}
        </div>
    </div>
    );
};

export default ContentList;