import React from 'react';
import TwoButtonModal from 'components/common/Modal/TwoButtonModal';
import 'semantic-ui-css/semantic.min.css';
import './BckDeleteModal.css';

const BckDeleteModal = ({
    modalVisible,
    toggleModal,
    onBckDelete
}) => {
  return (
      <TwoButtonModal visible={modalVisible}
                      leftButtonValue='삭제하기'
                      leftButtonColor='teal'
                      onLeftButtonClick={onBckDelete}
                      rightButtonValue='취소'
                      rightButtonColor='red'
                      onRightButtonClick={toggleModal}>
          <h3>삭제하기</h3>
          <label>정말 삭제하시겠습니까?</label>
      </TwoButtonModal>
  );
};

export default BckDeleteModal;