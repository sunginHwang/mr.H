import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as propertyDetailActions from 'store/modules/propertyDetail';
import PropertyDetailForm from 'components/Property/Detail/PropertyDetailForm';
import PropertyDepositSaveModal from 'components/Property/Modal/PropertyDepositSaveModal';
import TitleHeader from 'components/common/Header/TitleHeader';
import BeatLoading from 'components/common/Loading/BeatLoading';
import BottomSlideModal from 'components/common/Modal/BottomSlideModal';
import SlideModalLabel from 'components/common/Label/SlideModalLabel';
import { getRemainDate, calcMonthlyDepositMoney, comma, getRemainDatePercentage, isBiggerThenToday } from 'lib/util';
import { SAVING_DEPOSIT } from 'lib/constants';

import { InitialPropertyDetailData } from 'lib/variables';

class PropertyDetailContainer extends Component {

    constructor(props){
        super(props);
        this.state = {slideModal: false};
    };

  componentDidMount(){
    this.checkPropertyDetailAccess();
    this.loadPropertyDetailInfo();
  }

  /*최초접근 검사*/
  checkPropertyDetailAccess = () => {
    const { propertyIdx } = this.props.match.params;
    if(!Number.isInteger(Number.parseInt(propertyIdx,10))){
        alert('정상적인 접근이 아닙니다.');
        this.props.history.push('/property');
    }
  };

  /*슬라이드 모달 토글 메뉴*/
  toggleSlideModal = () => {
        this.setState({slideModal: !this.state.slideModal})
  };

  /*예금, 적금 상세 정보 불러오기*/
  loadPropertyDetailInfo = async () => {
    const { propertyDetailActions } = this.props;
    const { propertyIdx } = this.props.match.params;

    try{
        await propertyDetailActions.loadPropertyDetailInfo(propertyIdx);
    }catch(e){
        await alert(this.props.notifyMessage);
        await this.props.history.push('/property');
    }

    await this.setMonthlyMoney();
  };

  /*한달 월 납부 금액 계산하기*/
  setMonthlyMoney = () => {
      const { propertyDetailInfo, propertyDetailActions } = this.props;
      const depositType = propertyDetailInfo.get('typeIdx');

      if(depositType === SAVING_DEPOSIT){
          const monthlyMoney = calcMonthlyDepositMoney(propertyDetailInfo.get('targetAmount'), propertyDetailInfo.get('completeDate'));
          propertyDetailActions.changeMonthlyDepositMoney(monthlyMoney);
      }
  };

  /*적금 모달 토글 이벤트*/
  togglePropertyModal = async (modalType) => {
      const { propertyDetailActions } = this.props;
      const { setPropertyErrorMsg } = this;

      await modalType === 'deposit' && this.setMonthlyMoney(); // 월 입금액 자동계산 세팅
      await setPropertyErrorMsg('modalErrMsg',''); // 에러 메세지 초기화
      await propertyDetailActions.togglePropertyModal(modalType);
  };

  /*예금액 초과 검사*/
  isOverDepositMoney = () => {
      const { propertyDetailInfo, monthlyDepositMoney } = this.props;
      const totalSaveDepositMoney = this.handleGetCurrentAmount(propertyDetailInfo.get('depositLists').toJS());
      return propertyDetailInfo.get('targetAmount') < totalSaveDepositMoney + monthlyDepositMoney;
  };

  /*적금 타입 검사*/
  isSavingDepositType = () => {
      const { propertyDetailInfo } = this.props;
      return propertyDetailInfo.get('typeIdx') === SAVING_DEPOSIT;
  };

  /*에러메세지 세팅*/
  setPropertyErrorMsg = (errorType, value) => {
      const { propertyDetailActions } = this.props;
      propertyDetailActions.changeErrorMessage({type : errorType , value : value});
  };

  /*입금하기*/
  handleSaveDepositMoney = async() => {
      const { isOverDepositMoney,isSavingDepositType, setPropertyErrorMsg, togglePropertyModal, loadPropertyDetailInfo } = this;
      const { propertyDetailInfo, monthlyDepositMoney, propertyDetailActions } = this.props;
      if(isOverDepositMoney()){
          setPropertyErrorMsg('modalErrMsg','입금액이 목표액보다 많습니다.');return ;
      }

      if(!isSavingDepositType()){
          setPropertyErrorMsg('modalErrMsg','예금에 추가 입금을 하실 수 없습니다.');return ;
      }

      try{
          await propertyDetailActions.saveDepositMoney(propertyDetailInfo.get('propertyIdx'),propertyDetailInfo.get('typeIdx'),monthlyDepositMoney);
          await alert(this.props.notifyMessage);
          await loadPropertyDetailInfo();
      }catch(e){
          await alert(this.props.notifyMessage);
      }

      await togglePropertyModal('deposit');
  };

  /*예,적금 삭제*/
  handlePropertyDelete = async( propertyIdx ) => {

      const { togglePropertyModal } = this;
      const { propertyDetailActions } = this.props;

      try{
          await propertyDetailActions.deleteProperty(propertyIdx);
          await alert(this.props.notifyMessage);
          await this.props.history.goBack();
      }catch(e){
          await alert(this.props.notifyMessage);
      }

      await togglePropertyModal('delete');

  };

    /*예,적금 상태 변경*/
    changePropertyStatus = async( propertyIdx , status) => {

        const { propertyDetailActions } = this.props;

        try{
            await propertyDetailActions.changePropertyStatus(propertyIdx ,status);
        }catch(e){
            await alert(this.props.notifyMessage);
        }

        this.toggleSlideModal();
        await this.loadPropertyDetailInfo();
    };

  /*현재금액 구하기*/
  handleGetCurrentAmount = (amountList) => {
    return amountList.reduce((prev, save) => prev + save.depositAmount, 0);
  };

  /*월 납부 금액 변경*/
  handleChangeMonthlyDepositMoney = (e) => {
    const { propertyDetailActions } = this.props;
    propertyDetailActions.changeMonthlyDepositMoney(parseInt(e.target.value,10));
  };

  render() {
    const {
        handleGetCurrentAmount,
        handleChangeMonthlyDepositMoney,
        handleSaveDepositMoney,
        handlePropertyDelete,
        togglePropertyModal,
        toggleSlideModal,
        changePropertyStatus
    } = this;
    const { propertyDetailInfo, modal, monthlyDepositMoney, error, propertyDetailLoading } = this.props;
    const propertyInfo = propertyDetailInfo.toJS();
    const isProgressEndProperty = propertyInfo.delFlag == 'N' && isBiggerThenToday(propertyInfo.completeDate);
    let completeEventButton = '';

    if(isProgressEndProperty){
        completeEventButton = <div onClick={(e)=>{changePropertyStatus(propertyInfo.propertyIdx, 'C')}}>
                                <SlideModalLabel title='만기완료'/>
                              </div>;
    }

    if(propertyDetailLoading) return <BeatLoading loading={propertyDetailLoading}/>;

    return (
        <div>
            <TitleHeader
                iconColor='white'
                iconSize='large'
            />
            <PropertyDetailForm
                propertyTitle={propertyInfo.propertyTitle}
                targetAmount={propertyInfo.targetAmount}
                startDate={propertyInfo.startDate}
                completeDate={propertyInfo.completeDate}
                depositType={propertyInfo.typeIdx}
                depositList={propertyInfo.depositLists}
                getCurrentAmount={handleGetCurrentAmount}
                getRemainDatePercentage={getRemainDatePercentage}
                comma={comma}
                onDepositSaveClick={(e)=>{togglePropertyModal('deposit')}}
                toggleSlideModal={(e)=>{toggleSlideModal();}}
            />
            <PropertyDepositSaveModal
                modalVisible={modal.get('deposit')}
                monthlyDepositMoney={monthlyDepositMoney}
                toggleModal={(e)=>{togglePropertyModal('deposit')}}
                onMoneyChange={handleChangeMonthlyDepositMoney}
                onPropertyDepositSave={handleSaveDepositMoney}
                errorMessage={error.get('modalErrMsg')}
            />
            <BottomSlideModal
                visible={this.state.slideModal}
                title='원하시는 메뉴를 선택해 주세요.'
                cancelClick={(e)=>{toggleSlideModal();}}>
                <div onClick={(e)=>{handlePropertyDelete(propertyInfo.propertyIdx)}}>
                    <SlideModalLabel title='삭제하기'/>
                </div>
                {completeEventButton}
            </BottomSlideModal>
        </div>

    );
  }
}
export default connect(
    (state) => ({
        propertyDetailInfo: state.propertyDetail.get('propertyDetailInfo'),
        monthlyDepositMoney : state.propertyDetail.get('monthlyDepositMoney'),
        modal : state.propertyDetail.get('modal'),
        propertyDetailLoading: state.pender.pending['propertyDetail/LOAD_PROPERTY_DETAIL_INFO'],
        error : state.propertyDetail.get('error'),
        notifyMessage : state.propertyDetail.get('notifyMessage')
    }),
    (dispatch) => ({
        propertyDetailActions: bindActionCreators(propertyDetailActions, dispatch),
    })
)(PropertyDetailContainer);