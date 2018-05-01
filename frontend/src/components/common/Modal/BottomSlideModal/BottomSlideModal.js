import React from 'react';
import './BottomSlideModal.css';

const BottomSlideModal = ({visible,
                          title,
                          cancelClick,
                          children}) => {
    return (
        <div className={visible ? 'BottomSlideModal-wrapper' : ''}>
            <div className={ visible ? ' ModalWrapper-slide-on ModalWrapper-slide' : 'ModalWrapper-slide'}>
                <div className='BottomSlideModal-top-area'>
                    <div className='top-left-area'>
                        <span>{title}</span>
                    </div>
                    <div className='top-right-area' onClick={cancelClick}>
                        <span><a>취소</a></span>
                    </div>
                </div>
                <div className='clear-div-area'/>
                <div className='BottomSlideModal-content-area'>
                    {children}
                </div>
                <div className='BottomSlideModal-bottom-area'>
                    Copyright © 2018 woolta.com
                </div>
            </div>
        </div>
    );
};

export default BottomSlideModal;