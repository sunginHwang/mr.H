import React from 'react';
import './InsertButton.css';
const InsertButton = ({children}) => {
  return (
    <div >
        <button className='InsertButton'>
            {children}
        </button>
    </div>
  );
};
 
export default InsertButton;