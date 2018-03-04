import React from 'react';
import { BeatLoader } from 'react-spinners';
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

