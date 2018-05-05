import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckDetailActions from 'store/modules/bckDetail';
import BckDetailForm from 'components/BucketList/Detail/BckDetailForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import BeatLoading from 'components/common/Loading/BeatLoading';
import BottomTwoButton from 'components/common/Button/BottomTwoButton';
import BottomSlideModal from 'components/common/Modal/BottomSlideModal';
import SlideModalLabel from 'components/common/Label/SlideModalLabel';
import BckDepositModal from 'components/BucketList/Modal/BckDepositModal';
import { Icon } from 'semantic-ui-react';
import { getRemainDate, comma, getTodayForYYYYMMDD, isBiggerThenToday } from 'lib/util';
import { getDepositTotalMoney } from 'lib/deposit';
import { MONEY_COMPLETE, DATE_COMPLETE } from 'lib/constants';

class BckDetailContainer extends Component {

    constructor(props){
        super(props);
        this.state = {slideModal: false};
    };

    componentDidMount(){
       this.checkBckDetailAccess();
       this.loadBckDetailInfo();
    }

    /*슬라이드 모달 토글 메뉴*/
    toggleSlideModal = () => {
        this.setState({slideModal: !this.state.slideModal})
    };


    checkBckDetailAccess = () => {
      const { bckIdx } = this.props.match.params;
      if(!Number.isInteger(Number.parseInt(bckIdx,10))){
          alert('정상적인 접근이 아닙니다.');
          this.props.history.push('/bck');
      }
   };

    /*버킷리스트 상세 정보 로드*/
   loadBckDetailInfo = async () => {
       const { bckIdx } = this.props.match.params;
       const { bckDetailActions } = this.props;
       try{
           await bckDetailActions.loadBckDetailInfo(bckIdx);
       }catch(e){
           await alert(this.props.notifyMessage);
           await  this.props.history.push('/bck');
       }
   };
    /*버킷리스트 삭제*/
    handleBckDelete = async() => {
        const { bckDetailActions, bckDetailInfo } = this.props;

        try{
            await bckDetailActions.deleteBck(bckDetailInfo.bckIdx);
            await alert(this.props.notifyMessage);
            await  this.props.history.push('/bck');
        }catch(e){
            await alert(this.props.notifyMessage);
        }
        await this.toggleBckModal('delete');
    };

    /*버킷리스트 목표액 입금*/
    handleBckSaveDeposit = async () => {
        const { bckDetailActions, bckDepositMoney, bckDetailInfo } = this.props;

        if(bckDepositMoney === '' || bckDepositMoney === 0){
            alert('입금액을 넣어주세요.');return;
        }

        if(this.validOverDepositMoney(bckDetailInfo, bckDepositMoney)){
            alert('입금액이 남은 목표금액보다 많습니다.');return;
        }

        try{
            await bckDetailActions.saveBckDepositMoney(bckDetailInfo.bckIdx, bckDetailInfo.typeIdx, bckDepositMoney);
            await bckDetailActions.changeBckDepositMoney('');
            await alert(this.props.notifyMessage);
            await this.loadBckDetailInfo();
        }catch(e){
            await alert(this.props.notifyMessage);
        }
        await this.toggleBckModal('deposit');
    };

    /*입금액 초과 검사*/
    validOverDepositMoney = (bckInfo, depositMoney) => {
        return depositMoney + getDepositTotalMoney(bckInfo.depositLists)  > bckInfo.targetAmount;
    };

    /*입금액 변경 처리 핸들러*/
    handleChangeBckDepositMoney = (e) => {
        const { bckDetailActions } = this.props;
        const { value } = e.target;

        bckDetailActions.changeBckDepositMoney(Number.parseInt(value,10));
    };

    /*모달 열기,닫기 함수*/
    handleBckOpenModal = async (type) => {
        const { bckDetailActions } = this.props;
        await bckDetailActions.changeBckDepositMoney(0); // 입금 액 초기화
        await this.toggleBckModal(type);
    };

    /*모달 열기 닫기*/
    toggleBckModal = (modalType) => {
        const { bckDetailActions } = this.props;
        bckDetailActions.toggleBckModal(modalType);
    };

   /*버킷리스트 수정 */
   handleModify = () => {
       const { bckIdx } = this.props.match.params;
       this.props.history.push('/bck/modify/'+bckIdx);
   };

  render() {
   const { bckDetailInfo, bckDetailLoading, bckDepositMoney, modal } = this.props;

   const {
       handleModify,
       toggleBckModal,
       handleBckOpenModal,
       handleBckSaveDeposit,
       handleBckDelete,
       handleChangeBckDepositMoney,
       toggleSlideModal
   } = this;

   const remainDate = getRemainDate(getTodayForYYYYMMDD(), bckDetailInfo.completeDate);
   const isMoneyCompleteType = bckDetailInfo.typeIdx == MONEY_COMPLETE;

   if(bckDetailLoading) return <BeatLoading loading={bckDetailLoading}/>;

      return (
        <div>
            <TitleHeader
                iconColor='black'
                iconSize='large'
                titleName={bckDetailInfo.bckTitle}
            />
            <BckDetailForm
                bckInfo={bckDetailInfo}
                remainDate={remainDate > 0 ? remainDate : 0}
                comma={comma}
            />
            <BottomTwoButton
                onLeftBtnClick={isMoneyCompleteType ? (e)=>{handleBckOpenModal('deposit')} : (e)=>{}}
                leftBtnName={isMoneyCompleteType ? '입금하기' : ''}
                leftColor={isMoneyCompleteType ? 'deepBlue' : ''}
                onRightBtnClick={(e)=>{toggleSlideModal()}}
                rightBtnName={<Icon name='content' size='large'/>}
                rightColor='apricot'
            />
            {/*입금모달*/}
            <BckDepositModal
                modalVisible={modal.get('deposit')}
                bckDepositMoney={bckDepositMoney}
                onChangeBckDepositMoney={handleChangeBckDepositMoney}
                toggleModal={(e)=>{toggleBckModal('deposit')}}
                onDepositSave={handleBckSaveDeposit}
            />
            {/*슬라이드 모달*/}
            <BottomSlideModal
                visible={this.state.slideModal}
                title='버킷리스트 달성 방법을 선택하세요.'
                cancelClick={(e)=>{toggleSlideModal();}}>
                <div onClick={handleModify}>
                    <SlideModalLabel title='수정하기'/>
                </div>
                <div onClick={handleBckDelete}>
                    <SlideModalLabel title='삭제하기'/>
                </div>
            </BottomSlideModal>
        </div>
    );
  }
}

export default connect(
    (state) => ({
        bckDetailLoading: state.pender.pending['bckDetail/LOAD_BCK_DETAIL_INFO'],
        bckDetailInfo: state.bckDetail.get('bckDetailInfo').toJS(),
        notifyMessage : state.bckDetail.get('notifyMessage'),
        bckDepositMoney : state.bckDetail.get('bckDepositMoney'),
        modal: state.bckDetail.get('modal'),

    }),
    (dispatch) => ({
        bckDetailActions: bindActionCreators(bckDetailActions, dispatch),
    })
)(BckDetailContainer);