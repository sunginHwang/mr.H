import React, { Component } from 'react';

// import redux dependencies
import BckLstListForm from 'components/BucketList/List/BckLstListForm';
import MainHeader from 'components/common/Header/MainHeader';
import BckDepositModal from 'components/BucketList/Modal/BckDepositModal';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckLstListActions from 'store/modules/bckLstList';
import { InitinalBlListData } from 'lib/testValue';

class BckLstListContainer extends Component {

    componentDidMount() {
        this.loadBckList();
    }

    loadBckList(valueTest){
        const { bckLstListActions } = this.props;
        bckLstListActions.loadBckList(InitinalBlListData);
    }

    toggleBckDepositModal = (toggleKey) => {
        const { bckLstListActions } = this.props;
        bckLstListActions.toggleBckDepositModal(toggleKey);
    }

    onDepositClick = async (bckIdx) => {
        const { bckLstListActions } = this.props;
        await bckLstListActions.changeBckDepositIdx(bckIdx);
        await this.toggleBckDepositModal(true);
    }

    handleChangeBckDepositMoney = (e) => {
        const { bckLstListActions } = this.props;
        const { value } = e.target;

        bckLstListActions.changeBckDepositMoney(Number.parseInt(value));
    }

    handleSaveBckDeposit = async () => {
        const { bckLstListActions, bckDepositMoney, bckDepositIdx, bckList } = this.props;
        const bckListToJS = bckList.toJS();
        const overDepositMoney = this.checkBckOverDepositMoney(bckDepositIdx, bckDepositMoney);

        if(bckDepositMoney == ''){
            alert('입금액을 넣어주세요.');return;
        }

        if(!overDepositMoney){
            try{
                await bckLstListActions.saveBckDepositMoney(bckDepositMoney, bckDepositIdx);
                await alert('입금성공');
                await bckLstListActions.changeBckDepositMoney('');
                await this.loadBckList();
            }catch(e){
                await alert('입금에 실패하였습니다.');
            }
            await this.toggleBckDepositModal(false);
        }else{
            bckLstListActions.setError();
        }
    }

    checkBckOverDepositMoney = (bckIdx, depositMoney) => {
        const { bckList } = this.props;
        const bckListToJS = bckList.toJS();
        const DepositBckInfo = bckListToJS.filter(x => x.bckIdx === bckIdx)
                                          .reduce((x)=>x);

        const overTotalDepositMoney = depositMoney + DepositBckInfo.currentAmount  > DepositBckInfo.targetAmount;

        return overTotalDepositMoney;
    }


    render() {
        const {
            toggleBckDepositModal,
            checkBckDepositMoney,
            onDepositClick,
            handleChangeBckDepositMoney,
            handleSaveBckDeposit
        } = this;

        const {  bckDepositModal, bckList, bckDepositMoney } = this.props;

        return (
           <div>
               <MainHeader/>
               <div>
                   <BckLstListForm
                       BucketListListData={bckList.toJS()}
                       onDepositClick={onDepositClick}
                   />
               </div>
                <BckDepositModal
                    modalVisible={bckDepositModal}
                    bckDepositMoney={bckDepositMoney}
                    onChangeBckDepositMoney={handleChangeBckDepositMoney}
                    checkBckDepositMoney={checkBckDepositMoney}
                    toggleBckDepositModal={toggleBckDepositModal}
                    onDepositSave={handleSaveBckDeposit}
                />
           </div>
        );
    }
}

export default connect(
    (state) => ({
        bckDepositModal: state.bckLstList.get('bckDepositModal'),
        bckDepositMoney: state.bckLstList.get('bckDepositMoney'),
        bckDepositIdx: state.bckLstList.get('bckDepositIdx'),
        bckList :state.bckLstList.get('bckList')
    }),
    (dispatch) => ({
        bckLstListActions: bindActionCreators(bckLstListActions, dispatch),
    })
)(BckLstListContainer);
