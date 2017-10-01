import React from 'react';
import ModalWrapper from 'components/common/Modal/ModalWrapper';

const BckDepositModal = ({
    modalVisible,
    bckDepositMoney,
    toggleBckDepositModal,
    onChangeBckDepositMoney,
    onDepositSave
}) => {
  return (
      <ModalWrapper visible={modalVisible}>
          <div>
              <h2>입금액</h2>
              <input type="number" onChange={onChangeBckDepositMoney} value={bckDepositMoney}/>
              <button onClick={onDepositSave}>입금하기</button>
              <button onClick={(event)=>{toggleBckDepositModal(false)}}>부질없어</button>
          </div>
      </ModalWrapper>
  );
};
 
export default BckDepositModal;