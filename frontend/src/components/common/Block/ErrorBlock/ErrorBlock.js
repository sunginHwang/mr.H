import React from 'react';
import './ErrorBlock.css';
const ErrorBlock = ({
    errorMessage,
    positon
}) => {
  return (
    <div className={'common-error-block ' + positon}>
        {errorMessage}
    </div>
  );
};
 
export default ErrorBlock;