import React, { Component } from 'react';

// import redux dependencies
import BckLstListForm from 'components/BucketList/List/BckLstListForm';

import BckDepositModal from 'components/BucketList/Modal/BckDepositModal';
import BckDeleteModal from 'components/BucketList/Modal/BckDeleteModal';
import InsertButton from 'components/common/Button/InsertButton';
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

    toggleBckModal = (type, toggleKey) => {
        const { bckLstListActions } = this.props;
        type == 'deposit' && bckLstListActions.toggleBckDepositModal(toggleKey);
        type == 'delete' && bckLstListActions.toggleBckDeleteModal(toggleKey);

    }

    handleBckOpenModal = async (type, bckIdx) => {
        const { bckLstListActions } = this.props;
        await bckLstListActions.changeBckDepositIdx(bckIdx);
        await this.toggleBckModal(type,true);
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
            await this.toggleBckModal('deposit',false);
        }else{
            bckLstListActions.setError();
        }
    }

    handleBckDelete = () => {
        console.log(this.props.bckDepositIdx);
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
            toggleBckModal,
            checkBckDepositMoney,
            handleBckOpenModal,
            handleChangeBckDepositMoney,
            handleSaveBckDeposit,
            handleBckDelete
        } = this;

        const {  bckDepositModal,
                 bckList,
                 bckDepositMoney,
                 bckDeleteModal
        } = this.props;

        return (
           <div>
               <BckLstListForm
                       BucketListListData={bckList.toJS()}
                       handleBckOpenModal={handleBckOpenModal}
               />
               <InsertButton>
                   <Link to='/bck/insert'><Icon name='write' size='big'/></Link>
                 
               </InsertButton>
                <BckDepositModal
                    modalType='deposit'
                    modalVisible={bckDepositModal}
                    bckDepositMoney={bckDepositMoney}
                    onChangeBckDepositMoney={handleChangeBckDepositMoney}
                    checkBckDepositMoney={checkBckDepositMoney}
                    toggleBckModal={toggleBckModal}
                    onDepositSave={handleSaveBckDeposit}
                />
               <BckDeleteModal
                   modalType='delete'
                   modalVisible={bckDeleteModal}
                   toggleBckModal={toggleBckModal}
                   onBckDelete={handleBckDelete}
               />
           </div>
        );
    }
}

export default connect(
    (state) => ({
        bckDepositModal: state.bckLstList.get('bckDepositModal'),
        bckDeleteModal: state.bckLstList.get('bckDeleteModal'),
        bckDepositMoney: state.bckLstList.get('bckDepositMoney'),
        bckDepositIdx: state.bckLstList.get('bckDepositIdx'),
        bckList :state.bckLstList.get('bckList')
    }),
    (dispatch) => ({
        bckLstListActions: bindActionCreators(bckLstListActions, dispatch),
    })
)(BckLstListContainer);
