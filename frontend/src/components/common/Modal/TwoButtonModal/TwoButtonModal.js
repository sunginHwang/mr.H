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
          <div className='ModalWrapper-modal'>
              <div className='TwoButtonModal'>
                  {children}
                  <section className='TwoButtonModal-area'>
                      <Button className='TwoButtonModal-btn left'
                              basic
                              color={leftButtonColor}
                              onClick={onLeftButtonClick}>{leftButtonValue}
                      </Button>
                      <Button className='TwoButtonModal-btn right'
                              basic
                              color={rightButtonColor}
                              onClick={onRightButtonClick}>{rightButtonValue}
                      </Button>
                  </section>
              </div>
          </div>
      </ModalWrapper>
  );
};

export default TwoButtonModal;