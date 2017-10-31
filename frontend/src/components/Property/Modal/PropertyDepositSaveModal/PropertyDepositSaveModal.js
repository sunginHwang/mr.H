import React from 'react';
import { Input } from 'semantic-ui-react';
import TwoButtonModal from 'components/common/Modal/TwoButtonModal';
import 'semantic-ui-css/semantic.min.css';
import './PropertyDepositSaveModal.css';


const PropertyDepositSaveModal = ({
    modalVisible,
    monthlyDepositMoney,
    toggleModal,
    onMoneyChange,
    onPropertyDepositSave
}) => {
    return (
        <TwoButtonModal visible={modalVisible}
                        leftButtonValue='입금'
                        leftButtonColor='teal'
                        onLeftButtonClick={onPropertyDepositSave}
                        rightButtonValue='취소'
                        rightButtonColor='red'
                        onRightButtonClick={toggleModal}
        >
            <h3>입금액</h3>
            <Input className='property-deposit-modal-input'
                   icon='krw'
                   iconPosition='left'
                   type='number'
                   onChange={onMoneyChange}
                   value={monthlyDepositMoney}/>
        </TwoButtonModal>
    );
};

export default PropertyDepositSaveModal;