import React, { Component } from 'react';

// import redux dependencies
import BckLstListForm from 'components/BucketList/List/BckLstListForm';
import MainHeader from 'components/common/Header/MainHeader';
import BckDepositModal from 'components/BucketList/Modal/BckDepositModal';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckLstListActions from 'store/modules/bckLstList';

class BckLstListContainer extends Component {

    toggleBckDepositModal = (toggleKey) => {
        const { bckLstListActions } = this.props;
        bckLstListActions.toggleBckDepositModal(toggleKey);
    }

    changeBckDepositMoney = (DepositMoney) => {
        const { bckLstListActions } = this.props;
        bckLstListActions.changeBckDepositMoney(toggleKey);
    }

    checkBckDepositMoney = (DepositMoney) => {
        const { bckLstListActions } = this.props;

        bckLstListActions.changeBckDepositMoney(toggleKey);
    }

    test = () =>{
        const { bckList } = this.props;
        const bckListToJS = bckList.toJS();
        const findBck = bckListToJS.filter(x => x.bckIdx ==3);
        console.log(findBck);
        console.log(findBck.targetAmount);
    }

    render() {
        const { toggleBckDepositModal, test } = this;
        const {  bckDepositModal, bckList, bckDepositMoney } = this.props;

        return (
           <div>
               <MainHeader/>
               <div>
                   <BckLstListForm
                       BucketListListData={bckList.toJS()}
                       toggleBckDepositModal={toggleBckDepositModal}
                   />
               </div>
                <BckDepositModal
                    modalVisible={bckDepositModal}
                    bckDepositMoney={bckDepositMoney}
                    toggleBckDepositModal={toggleBckDepositModal}
                />
               <button onClick={test}>
                   체크 테스트 용
               </button>
           </div>
        );
    }
}

export default connect(
    (state) => ({
        bckDepositModal: state.bckLstList.get('bckDepositModal'),
        bckDepositMoney: state.bckLstList.get('bckDepositMoney'),
        bckList :state.bckLstList.get('bckList')
    }),
    (dispatch) => ({
        bckLstListActions: bindActionCreators(bckLstListActions, dispatch),
    })
)(BckLstListContainer);
