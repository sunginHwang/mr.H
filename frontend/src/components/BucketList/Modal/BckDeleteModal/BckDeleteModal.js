import React from 'react';
import BckModal from 'components/BucketList/Modal/BckModal';
import 'semantic-ui-css/semantic.min.css';
import './BckDeleteModal.css';

const BckDeleteModal = ({
    modalVisible,
    toggleBckModal,
    modalType,
    onBckDelete
}) => {
  return (
      <BckModal visible={modalVisible}
                modalTitle='삭제하기'
                onSuccessEvent={onBckDelete}
                successButtonText='삭제'
                onFailEvent={(e)=>{toggleBckModal(modalType,false)}}
                failButtonText='취소'>
          <label>정말 삭제하시겠습니까?</label>
      </BckModal>
  );
};

export default BckDeleteModal;