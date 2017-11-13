import React from 'react';
import './ModalWrapper.css';

const ModalWrapper = ({
    visible,
    children
}) => {
  return (
      visible &&
            <div className='ModalWrapper'>
                <div className='ModalWrapper-modal'>
                    {children}
                 </div>
            </div>

  );
};

export default ModalWrapper;

