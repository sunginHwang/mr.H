import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckListActions from 'store/modules/bckList';

import BckListForm from 'components/BucketList/List/BckListForm';
import BckListToggle from 'components/BucketList/List/BckListToggle';
import BckDepositModal from 'components/BucketList/Modal/BckDepositModal';
import BckDeleteModal from 'components/BucketList/Modal/BckDeleteModal';
import InsertButton from 'components/common/Button/InsertButton';
import { isBiggerThenToday } from 'lib/util';
import { InitinalBlListData } from 'lib/variables';
import { MONEY_COMPLETE } from 'lib/constants';

class BckListContainer extends Component {

    componentDidMount() {
        this.loadBckList();
    }

    loadBckList = (valueTest) => {
        const { bckListActions } = this.props;
        bckListActions.loadBckList(InitinalBlListData);
    }

    filterProceedingBckList = (bckList) => {
        return bckList.filter(bckInfo => bckInfo.completeType === MONEY_COMPLETE ?
                                         bckInfo.currentAmount < bckInfo.targetAmount :
                                         !isBiggerThenToday(bckInfo.completeDate));
    }

    filterCompleteBckList = (bckList) => {
        return bckList.filter(bckInfo => bckInfo.completeType === MONEY_COMPLETE ?
                                         bckInfo.currentAmount >= bckInfo.targetAmount :
                                         isBiggerThenToday(bckInfo.completeDate));
    }

    toggleBckModal = (modalType) => {
        const { bckListActions } = this.props;
        bckListActions.toggleBckModal(modalType);
    }

    handleBckOpenModal = async (type, bckIdx) => {
        const { bckListActions } = this.props;
        await bckListActions.changeBckDepositIdx(bckIdx); // 리스트 중 어떤 버킷리스트 고를지
        await bckListActions.changeBckDepositMoney(0); // 입금 액 초기화
        await this.toggleBckModal(type);
    }
    
    handleGetBckList = () => {
        const { filterProceedingBckList, filterCompleteBckList } = this;
        const { bckToggleMode ,bckList} = this.props;
        const bckListToJS = bckList.toJS();
        return bckToggleMode === 'proceeding' ? filterProceedingBckList(bckList.toJS())
                                              : filterCompleteBckList(bckList.toJS());
    }

    handleChangeBckDepositMoney = (e) => {
        const { bckListActions } = this.props;
        const { value } = e.target;

        bckListActions.changeBckDepositMoney(Number.parseInt(value,10));
    }

    handleSaveBckDeposit = async () => {
        const { bckListActions, bckDepositMoney, bckDepositIdx, bckList } = this.props;
        const bckListToJS = bckList.toJS();
        const overDepositMoney = this.checkBckOverDepositMoney(bckDepositIdx, bckDepositMoney);

        if(bckDepositMoney === ''){
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
            await this.toggleBckModal('deposit');
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

    handleChangeBckToggleMode = (toggleMode) => {
        const { bckListActions } = this.props;
        bckListActions.changeBckToggleMode(toggleMode);
    }


    render() {
        const {
            toggleBckModal,
            checkBckDepositMoney,
            handleShowBckDetail,
            handleBckOpenModal,
            handleChangeBckDepositMoney,
            handleSaveBckDeposit,
            handleBckDelete,
            handleChangeBckToggleMode,
            handleGetBckList
        } = this;
        const { bckDepositMoney, bckToggleMode, modal} = this.props;
        const bckList = handleGetBckList();
        console.log(bckList);
        return (
           <div>
               <BckListToggle
                   onToggleClick={handleChangeBckToggleMode}
                   toggleMode={bckToggleMode}
               />
               <BckListForm
                       BucketListListData={bckList}
                       onShowBckDetailInfo={handleShowBckDetail}
                       onBckOpenModal={handleBckOpenModal}
                       toggleMode={bckToggleMode}
               />
               <InsertButton>
                   <Link to='/bck/insert'>
                       <Icon name='write'
                             style={{color:'#fff'}}
                             size='big'/>
                   </Link>
               </InsertButton>
                <BckDepositModal
                    modalVisible={modal.get('deposit')}
                    bckDepositMoney={bckDepositMoney}
                    onChangeBckDepositMoney={handleChangeBckDepositMoney}
                    toggleModal={(e)=>{toggleBckModal('deposit')}}
                    onDepositSave={handleSaveBckDeposit}
                />
               <BckDeleteModal
                   modalVisible={modal.get('delete')}
                   toggleModal={(e)=>{toggleBckModal('delete')}}
                   onBckDelete={handleBckDelete}
               />
           </div>
        );
    }
}

export default connect(
    (state) => ({
        modal: state.bckList.get('modal'),
        bckDepositMoney: state.bckList.get('bckDepositMoney'),
        bckDepositIdx: state.bckList.get('bckDepositIdx'),
        bckList :state.bckList.get('bckList'),
        bckToggleMode : state.bckList.get('bckToggleMode')
    }),
    (dispatch) => ({
        bckListActions: bindActionCreators(bckListActions, dispatch),
    })
)(BckListContainer);
