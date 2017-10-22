import React from 'react';
import { Input } from 'semantic-ui-react';
import BckModal from 'components/BucketList/Modal/BckModal';
import 'semantic-ui-css/semantic.min.css';
import './BckDepositModal.css';
const BckDepositModal = ({
    modalVisible,
    bckDepositMoney,
    toggleBckModal,
    onChangeBckDepositMoney,
    onDepositSave,
    modalType
}) => {
  return (
      <BckModal visible={modalVisible}
                modalTitle='입금액'
                onSuccessEvent={onDepositSave}
                successButtonText='입금'
                onFailEvent={(e)=>{toggleBckModal(modalType,false)}}
                failButtonText='취소'>
          <Input className='bck-deposit-modal-input'
                 icon='krw'
                 iconPosition='left'
                 type='number'
                 onChange={onChangeBckDepositMoney}
                 value={bckDepositMoney}/>
      </BckModal>
  );
};
 
export default BckDepositModal;