import React from 'react';
import { Input } from 'semantic-ui-react';
import TwoButtonModal from 'components/common/Modal/TwoButtonModal';
import 'semantic-ui-css/semantic.min.css';
import './BckDepositModal.css';


const BckDepositModal = ({
    modalVisible,
    bckDepositMoney,
    toggleModal,
    onChangeBckDepositMoney,
    onDepositSave,
}) => {
  return (
      <TwoButtonModal visible={modalVisible}
                      leftButtonValue='입금'
                      leftButtonColor='teal'
                      onLeftButtonClick={onDepositSave}
                      rightButtonValue='취소'
                      rightButtonColor='red'
                      onRightButtonClick={toggleModal}
      >
          <h3>입금액</h3>
          <Input className='bck-deposit-modal-input'
                 icon='krw'
                 iconPosition='left'
                 type='number'
                 onChange={onChangeBckDepositMoney}
                 value={bckDepositMoney}/>
      </TwoButtonModal>
  );
};
 
export default BckDepositModal;