import React from 'react';
import './ErrorBlock.css';
const ErrorBlock = ({
    errorMessage,
    position
}) => {
  return (
    <div className={ 'ErrorBlock ' + position + ( errorMessage ? ' on-error ' : '')}>
        {errorMessage}
    </div>
  );
};
 
export default ErrorBlock;

