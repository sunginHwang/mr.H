import React, { Component } from 'react';

// import redux dependencies
import BckLstListForm from 'components/BucketList/List/BckLstListForm';
import MainHeader from 'components/common/Header/MainHeader';
import ModalWrapper from 'components/common/Modal/ModalWrapper';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckLstListActions from 'store/modules/bckLstList';

import { InitinalBlListData } from 'lib/testValue';

class BckLstListContainer extends Component {

    toggleBckDepositModal = (toggleKey) => {
        const { bckLstListActions } = this.props;
        bckLstListActions.toggleBckDepositModal(toggleKey);
    }

    testterrr = (e) => {
       console.log(e);
    }

    render() {
        const { toggleBckDepositModal, testterrr } = this;
        const {  bckDepositModal } = this.props;
        const BucketListListData = InitinalBlListData;

        return (
           <div>
               <MainHeader/>
               <div>
                   <BckLstListForm
                       BucketListListData={BucketListListData}
                       toggleBckDepositModal={toggleBckDepositModal}
                   />
               </div>
                <ModalWrapper visible={bckDepositModal}>
                    <div>
                        <h2>사랑</h2>
                        <button onClick={(event)=>{toggleBckDepositModal(false)}}>부질없어</button>

                    </div>
                </ModalWrapper>
           </div>
        );
    }
}

export default connect(
    (state) => ({
        bckDepositModal: state.bckLstList.get('bckDepositModal')
    }),
    (dispatch) => ({
        bckLstListActions: bindActionCreators(bckLstListActions, dispatch)
    })
)(BckLstListContainer);
