import React from 'react';
import './ModalWrapper.css';

const ModalWrapper = ({
    visible,
    children
}) => {
  return (
      visible &&
            <div className='modal-wrapper'>
                <div className='modal'>
                    {children}
                 </div>
            </div>

  );
};

export default ModalWrapper;

