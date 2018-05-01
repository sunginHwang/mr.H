import React from 'react';
import './ModalWrapper.css';

const ModalWrapper = ({
    visible,
    children
}) => {
  return (
      visible &&
            <div className='ModalWrapper'>
                    {children}
            </div>

  );
};

export default ModalWrapper;

