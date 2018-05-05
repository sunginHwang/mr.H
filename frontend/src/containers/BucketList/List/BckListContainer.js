import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckListActions from 'store/modules/bckList';

import BckListForm from 'components/BucketList/List/BckListForm';
import BckListToggle from 'components/BucketList/List/BckListToggle';
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
            handleShowBckDetail,
            handleChangeToggle,
            getBckList,
            toggleBckInsertModal
        } = this;
        const { bckToggleMode, bckListLoading } = this.props;
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
                       getCurrentMoney={getDepositTotalMoney}
               />
               <InsertButton>
                   <div onClick={(e)=>{toggleBckInsertModal();}}>
                       <span>버킷리스트 등록하기</span>
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
           </div>
        );
    }
}

export default connect(
    (state) => ({
        bckListLoading: state.pender.pending['bckList/LOAD_BCK_LIST'],
        notifyMessage: state.bckList.get('notifyMessage'),
        bckList :state.bckList.get('bckList').toJS(),
        bckToggleMode : state.bckList.get('bckToggleMode'),
    }),
    (dispatch) => ({
        bckListActions: bindActionCreators(bckListActions, dispatch),
    })
)(BckListContainer);
