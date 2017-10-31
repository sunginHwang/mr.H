import React from 'react';
import { Button } from 'semantic-ui-react';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import 'semantic-ui-css/semantic.min.css';
import './TwoButtonModal.css';

const TwoButtonModal = ({
    visible,
    leftButtonValue,
    leftButtonColor,
    onLeftButtonClick,
    rightButtonValue,
    rightButtonColor,
    onRightButtonClick,
    children
}) => {
  return (
      <ModalWrapper visible={visible}>
          <div className='two-btn-modal'>
              {children}
              <section className='two-btn-wrapper'>
                  <Button className='modal-btn left'
                          basic
                          color={leftButtonColor}
                          onClick={onLeftButtonClick}>{leftButtonValue}
                  </Button>
                  <Button className='modal-btn right'
                          basic
                          color={rightButtonColor}
                          onClick={onRightButtonClick}>{rightButtonValue}
                  </Button>
              </section>
          </div>
      </ModalWrapper>
  );
};

export default TwoButtonModal;