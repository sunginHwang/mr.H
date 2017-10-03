import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import 'semantic-ui-css/semantic.min.css';
import './BckModal.css';
const BckModal = ({
    visible,
    modalTitle,
    onSuccessEvent,
    successButtonText,
    onFailEvent,
    failButtonText,
    children
}) => {
    return (
        <ModalWrapper visible={visible}>
            <div className="bck-modal">
                <h3>{modalTitle}</h3>
                {children}
                <section className="bck-event-modal-button">
                    <Button className="bck-deposit-modal-deposit-button"
                            basic
                            color='teal'
                            onClick={onSuccessEvent}>{successButtonText}
                    </Button>
                    <Button className="bck-deposit-modal-close-button"
                            basic
                            color='red'
                            onClick={onFailEvent}>{failButtonText}
                    </Button>
                </section>
            </div>
        </ModalWrapper>
    );
};

export default BckModal;