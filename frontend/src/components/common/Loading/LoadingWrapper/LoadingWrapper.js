import React from 'react';
import './LoadingWrapper.css';
const LoadingWrapper = ({children}) => {
    return (
        <div className='loadingWrapper'>
            <div className='loading-position'>
                {children}
            </div>
        </div>
    );
};
export default LoadingWrapper;

