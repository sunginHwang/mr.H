import React from 'react';
import ModalWrapper from 'components/common/Modal/ModalWrapper';

const BckDepositModal = ({
    modalVisible,
    toggleBckDepositModal,
    bckDepositMoney
}) => {
  return (
      <ModalWrapper visible={modalVisible}>
          <div>
              <h2>입금액</h2>
              <input type="text" value={bckDepositMoney}/>
              <button onClick={(event)=>{toggleBckDepositModal(false)}}>부질없어</button>
          </div>
      </ModalWrapper>
  );
};
 
export default BckDepositModal;