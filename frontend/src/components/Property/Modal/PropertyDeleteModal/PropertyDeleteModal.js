import React from 'react';
import TwoButtonModal from 'components/common/Modal/TwoButtonModal';
import './PropertyDeleteModal.css';


const PropertyDeleteModal = ({
    propertyTitle,
    modalVisible,
    toggleModal,
    onPropertyDelete
}) => {
    return (
        <TwoButtonModal visible={modalVisible}
                        leftButtonValue='삭제'
                        leftButtonColor='teal'
                        onLeftButtonClick={onPropertyDelete}
                        rightButtonValue='취소'
                        rightButtonColor='red'
                        onRightButtonClick={toggleModal}
        >
            <h3>{propertyTitle}</h3>
            <label>정말 삭제하시겠습니까?.</label>
        </TwoButtonModal>
    );
};

export default PropertyDeleteModal;