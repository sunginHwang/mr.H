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
import BeatLoading from 'components/common/Loading/BeatLoading';
import BottomSlideModal from 'components/common/Modal/BottomSlideModal';
import SlideModalLabel from 'components/common/Label/SlideModalLabel';

import { getDepositTotalMoney } from 'lib/deposit';
import { isBiggerThenToday } from 'lib/util';
import { MONEY_COMPLETE, DATE_COMPLETE } from 'lib/constants';

class BckListContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            insertModalVisible: false
        };
    };

    componentDidMount() {
        this.loadBckList();
    }

    /*버킷리스트 데이터 가져오기*/
    loadBckList = () => {
        const { bckListActions } = this.props;
        bckListActions.loadBckList();
    };

    /*작성 모달 토글 메뉴*/
    toggleBckInsertModal = () => {
        this.setState({insertModalVisible: !this.state.insertModalVisible})
    };

    /*완료된 or 진행중인 버킷리스트 가져오기*/
    getBckList = () => {
        const { filterProceedingBckList, filterCompleteBckList } = this;
        const { bckToggleMode ,bckList} = this.props;
        return bckToggleMode === 'proceeding' ? filterProceedingBckList(bckList)
                                              : filterCompleteBckList(bckList);
    };

    /*진행중인 버킷리스트 필터링*/
    filterProceedingBckList = (bckList) => {
        return bckList.filter(bckInfo => bckInfo.typeIdx === MONEY_COMPLETE ?
                                           getDepositTotalMoney(bckInfo.depositLists) < bckInfo.targetAmount :
                                           !isBiggerThenToday(bckInfo.completeDate));
    };

    /*완료된 버킷리스트 필터링*/
    filterCompleteBckList = (bckList) => {
        return bckList.filter(bckInfo => bckInfo.typeIdx === MONEY_COMPLETE ?
                                             getDepositTotalMoney(bckInfo.depositLists) >= bckInfo.targetAmount :
                                             isBiggerThenToday(bckInfo.completeDate));
    };

    /*모달 여닫기 함수*/
    handleBckOpenModal = async (type, bckIdx) => {
        const { bckListActions } = this.props;
        await bckListActions.changeBckDepositIdx(bckIdx); // 리스트 중 어떤 버킷리스트 고를지
        await bckListActions.changeBckDepositMoney(0); // 입금 액 초기화
        await this.toggleBckModal(type);
    };

    /*모달 열기 닫기*/
    toggleBckModal = (modalType) => {
        const { bckListActions } = this.props;
        bckListActions.toggleBckModal(modalType);
    };

    /*입금액 변경 처리 핸들러*/
    handleChangeBckDepositMoney = (e) => {
        const { bckListActions } = this.props;
        const { value } = e.target;

        bckListActions.changeBckDepositMoney(Number.parseInt(value,10));
    };

    /*버킷리스트 목표액 입금*/
    handleBckSaveDeposit = async () => {
        const { bckListActions, bckDepositMoney, bckDepositIdx, bckList } = this.props;
        const saveBckInfo = bckList.find((x) => x.bckIdx === bckDepositIdx);

        if(bckDepositMoney === '' || bckDepositMoney === 0){
            alert('입금액을 넣어주세요.');return;
        }

        if(this.validOverDepositMoney(bckDepositIdx, bckDepositMoney)){
            alert('입금액이 남은 목표금액보다 많습니다.');return;
        }

        try{
            await bckListActions.saveBckDepositMoney(saveBckInfo.bckIdx, saveBckInfo.typeIdx, bckDepositMoney);
            await bckListActions.changeBckDepositMoney('');
            await alert(this.props.notifyMessage);
            await this.loadBckList();
        }catch(e){
            await alert(this.props.notifyMessage);
        }
        await this.toggleBckModal('deposit');
    };

    /*입금액 초과 검사*/
    validOverDepositMoney = (bckIdx, depositMoney) => {
        const { bckList } = this.props;
        const bckInfo = bckList.find(x => x.bckIdx === bckIdx);
        const overTotalDepositMoney = depositMoney + getDepositTotalMoney(bckInfo.depositLists)  > bckInfo.targetAmount;

        return overTotalDepositMoney;
    };

    /*버킷리스트 삭제*/
    handleBckDelete = async() => {
        const { bckListActions, bckDepositIdx } = this.props;

        try{
            await bckListActions.deleteBck(bckDepositIdx);
            await alert(this.props.notifyMessage);
            await this.loadBckList();
        }catch(e){
            await alert(this.props.notifyMessage);
        }
        await this.toggleBckModal('delete');
    };

    /*버킷리스트 상세보기*/
    handleShowBckDetail = (bckIdx) => {
        this.props.history.push('/bck/detail/'+bckIdx);
    };

    /*토글 변경*/
    handleChangeToggle = (toggleMode) => {
        const { bckListActions } = this.props;
        bckListActions.changeBckToggleMode(toggleMode);
    };


    render() {
        const {
            toggleBckModal,
            handleShowBckDetail,
            handleBckOpenModal,
            handleChangeBckDepositMoney,
            handleBckSaveDeposit,
            handleBckDelete,
            handleChangeToggle,
            getBckList,
            toggleBckInsertModal
        } = this;
        const { bckDepositMoney, bckToggleMode, modal, bckListLoading } = this.props;
        const bckList = getBckList();

        if(bckListLoading) return <BeatLoading loading={bckListLoading}/>;

        return (
           <div>
               <BckListToggle
                   onToggleClick={handleChangeToggle}
                   toggleMode={bckToggleMode}
               />
               <BckListForm
                       BucketListListData={bckList}
                       onShowBckDetailInfo={handleShowBckDetail}
                       onBckOpenModal={handleBckOpenModal}
                       getCurrentMoney={getDepositTotalMoney}
                       toggleMode={bckToggleMode}
               />
               <InsertButton>
                   <div onClick={(e)=>{toggleBckInsertModal();}}>
                       <Icon name='write'
                             style={{color:'#fff'}}
                             size='big'/>
                   </div>
               </InsertButton>
               <BottomSlideModal
                   visible={this.state.insertModalVisible}
                   title='버킷리스트 달성 방법을 선택하세요.'
                   cancelClick={(e)=>{toggleBckInsertModal();}}>
                   <Link to='/bck/insert/3'>
                       <SlideModalLabel title='목표기간 안에 달성하기'/>
                   </Link>
                   <Link to='/bck/insert/4'>
                       <SlideModalLabel title='목표금액 달성하기'/>
                   </Link>
               </BottomSlideModal>
                <BckDepositModal
                    modalVisible={modal.get('deposit')}
                    bckDepositMoney={bckDepositMoney}
                    onChangeBckDepositMoney={handleChangeBckDepositMoney}
                    toggleModal={(e)=>{toggleBckModal('deposit')}}
                    onDepositSave={handleBckSaveDeposit}
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
        bckListLoading: state.pender.pending['bckList/LOAD_BCK_LIST'],
        bckDepositMoney: state.bckList.get('bckDepositMoney'),
        bckDepositIdx: state.bckList.get('bckDepositIdx'),
        notifyMessage: state.bckList.get('notifyMessage'),
        bckList :state.bckList.get('bckList').toJS(),
        bckToggleMode : state.bckList.get('bckToggleMode'),
    }),
    (dispatch) => ({
        bckListActions: bindActionCreators(bckListActions, dispatch),
    })
)(BckListContainer);
