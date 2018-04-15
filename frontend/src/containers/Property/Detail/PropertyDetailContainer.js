import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as propertyDetailActions from 'store/modules/propertyDetail';
import PropertyDetailForm from 'components/Property/Detail/PropertyDetailForm';
import PropertyDepositSaveModal from 'components/Property/Modal/PropertyDepositSaveModal';
import PropertyDeleteModal from 'components/Property/Modal/PropertyDeleteModal';
import TitleHeader from 'components/common/Header/TitleHeader';
import BeatLoading from 'components/common/Loading/BeatLoading';
import { getRemainDate, calcMonthlyDepositMoney, comma, getRemainDatePercentage } from 'lib/util';
import { SAVING_DEPOSIT } from 'lib/constants';

import { InitialPropertyDetailData } from 'lib/variables';

class PropertyDetailContainer extends Component {

  componentDidMount(){
    this.checkPropertyDetailAccess();
    this.loadPropertyDetailInfo();
  }

  checkPropertyDetailAccess = () => {
    const { propertyIdx } = this.props.match.params;
    if(!Number.isInteger(Number.parseInt(propertyIdx,10))){
        alert('정상적인 접근이 아닙니다.');
        this.props.history.push('/property');
    }
  };

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

  setMonthlyMoney = () => {
      const { propertyDetailInfo, propertyDetailActions } = this.props;
      const depositType = propertyDetailInfo.get('typeIdx');

      if(depositType === SAVING_DEPOSIT){
          const monthlyMoney = calcMonthlyDepositMoney(propertyDetailInfo.get('targetAmount'), propertyDetailInfo.get('completeDate'));
          propertyDetailActions.changeMonthlyDepositMoney(monthlyMoney);
      }
  };

  togglePropertyModal = async (modalType) => {
      const { propertyDetailActions } = this.props;
      const { setPropertyErrorMsg } = this;

      await modalType === 'deposit' && this.setMonthlyMoney(); // 월 입금액 자동계산 세팅
      await setPropertyErrorMsg('modalErrMsg',''); // 에러 메세지 초기화
      await propertyDetailActions.togglePropertyModal(modalType);
  }

  isOverDepositMoney = () => {
      const { propertyDetailInfo, monthlyDepositMoney } = this.props;
      const totalSaveDepositMoney = this.handleGetCurrentAmount(propertyDetailInfo.get('depositLists').toJS());
      return propertyDetailInfo.get('targetAmount') < totalSaveDepositMoney + monthlyDepositMoney;
  };

  isSavingDepositType = () => {
      const { propertyDetailInfo } = this.props;
      return propertyDetailInfo.get('typeIdx') === SAVING_DEPOSIT;
  };


  setPropertyErrorMsg = (errorType, value) => {
      const { propertyDetailActions } = this.props;
      propertyDetailActions.changeErrorMessage({type : errorType , value : value});
  };

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

  handleGetCurrentAmount = (amountList) => {
    return amountList.reduce((prev, save) => prev + save.depositAmount, 0);
  };


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
        togglePropertyModal
    } = this;
    const { propertyDetailInfo, modal, monthlyDepositMoney, error, propertyDetailLoading } = this.props;
    const propertyInfo = propertyDetailInfo.toJS();

    if(propertyDetailLoading) return <BeatLoading loading={propertyDetailLoading}/>;

    return (
        <div>
            <TitleHeader
                iconColor='black'
                iconSize='large'
                titleName={propertyInfo.propertyTitle}
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
                onPropertyDeleteClick={(e)=>{togglePropertyModal('delete')}}
            />
            <PropertyDepositSaveModal
                modalVisible={modal.get('deposit')}
                monthlyDepositMoney={monthlyDepositMoney}
                toggleModal={(e)=>{togglePropertyModal('deposit')}}
                onMoneyChange={handleChangeMonthlyDepositMoney}
                onPropertyDepositSave={handleSaveDepositMoney}
                errorMessage={error.get('modalErrMsg')}
            />
            <PropertyDeleteModal
                propertyTitle={propertyInfo.propertyTitle}
                modalVisible={modal.get('delete')}
                toggleModal={(e)=>{togglePropertyModal('delete')}}
                onPropertyDelete={(e)=>{handlePropertyDelete(propertyInfo.propertyIdx)}}
            />
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