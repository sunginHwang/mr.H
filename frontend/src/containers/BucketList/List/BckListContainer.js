import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckListActions from 'store/modules/bckList';

import BckListForm from 'components/BucketList/List/BckListForm';
import BckDepositModal from 'components/BucketList/Modal/BckDepositModal';
import BckDeleteModal from 'components/BucketList/Modal/BckDeleteModal';
import InsertButton from 'components/common/Button/InsertButton';
import { InitinalBlListData } from 'lib/variables';

class BckListContainer extends Component {

    componentDidMount() {
        this.loadBckList();
    }

    loadBckList = (valueTest) => {
        const { bckListActions } = this.props;
        bckListActions.loadBckList(InitinalBlListData);
    }

    toggleBckModal = (type, toggleKey) => {
        const { bckListActions } = this.props;
        type == 'deposit' && bckListActions.toggleBckDepositModal(toggleKey);
        type == 'delete' && bckListActions.toggleBckDeleteModal(toggleKey);

    }

    handleBckOpenModal = async (type, bckIdx) => {
        const { bckListActions } = this.props;
        await bckListActions.changeBckDepositIdx(bckIdx);
        await this.toggleBckModal(type,true);
    }

    handleChangeBckDepositMoney = (e) => {
        const { bckListActions } = this.props;
        const { value } = e.target;

        bckListActions.changeBckDepositMoney(Number.parseInt(value));
    }

    handleSaveBckDeposit = async () => {
        const { bckListActions, bckDepositMoney, bckDepositIdx, bckList } = this.props;
        const bckListToJS = bckList.toJS();
        const overDepositMoney = this.checkBckOverDepositMoney(bckDepositIdx, bckDepositMoney);

        if(bckDepositMoney == ''){
            alert('입금액을 넣어주세요.');return;
        }

        if(!overDepositMoney){
            try{
                await bckListActions.saveBckDepositMoney(bckDepositMoney, bckDepositIdx);
                await alert('입금성공');
                await bckListActions.changeBckDepositMoney('');
                await this.loadBckList();
            }catch(e){
                await alert('입금에 실패하였습니다.');
            }
            await this.toggleBckModal('deposit',false);
        }else{
            bckListActions.setError();
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

    handleShowBckDetail = (bckIdx) => {
        this.props.history.push('/bck/detail/'+bckIdx);
    }


    render() {
        const {
            toggleBckModal,
            checkBckDepositMoney,
            handleShowBckDetail,
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
               <BckListForm
                       BucketListListData={bckList.toJS()}
                       onShowBckDetailInfo={handleShowBckDetail}
                       onBckOpenModal={handleBckOpenModal}
               />
               <InsertButton>
                   <Link to='/bck/insert'>
                       <Icon name='write'
                             size='big'/>
                   </Link>
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
        bckDepositModal: state.bckList.get('bckDepositModal'),
        bckDeleteModal: state.bckList.get('bckDeleteModal'),
        bckDepositMoney: state.bckList.get('bckDepositMoney'),
        bckDepositIdx: state.bckList.get('bckDepositIdx'),
        bckList :state.bckList.get('bckList')
    }),
    (dispatch) => ({
        bckListActions: bindActionCreators(bckListActions, dispatch),
    })
)(BckListContainer);
