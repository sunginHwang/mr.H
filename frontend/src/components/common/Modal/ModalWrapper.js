import React from 'react';
import Transition from 'react-transition-group/Transition';
import { Modal } from 'semantic-ui-react'

import './ModalWrapper.css';

const ModalWrapper = ({visible, children}) => {
  return (
      visible &&
            <div className="modal-wrapper">
                <div className="modal">
                    {children}
                 </div>
            </div>
  );
};

export default ModalWrapper;

