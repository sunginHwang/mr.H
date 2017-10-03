import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import BckModal from 'components/BucketList/Modal/BckModal';
import 'semantic-ui-css/semantic.min.css';
import './BckDepositModal.css';

const BckDeleteModal = (
    modalVisible,
    toggleBckDepositModal,
    onBckDelete
) => {
  return (
      <BckModal visible={modalVisible}
                modalTitle="입금액"
                onSuccessEvent={onBckDelete}
                successButtonText="삭제"
                onFailEvent={(event)=>{toggleBckDepositModal(false)}}
                failButtonText="취소">
          <label>정말 삭제하시겠습니까?</label>
      </BckModal>
  );
};

export default BckDeleteModal;