import React from 'react';
import './ErrorBlock.css';
const ErrorBlock = ({
    errorMessage,
    positon
}) => {
  return (
    <div className={errorMessage ? 'on-error '+ 'ErrorBlock ' + positon
                                 : 'ErrorBlock ' + positon }>
        {errorMessage}
    </div>
  );
};
 
export default ErrorBlock;

