import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as propertyDetailActions from 'store/modules/propertyDetail';
import PropertyDetailForm from 'components/Property/Detail/PropertyDetailForm';
import PropertyDepositSaveModal from 'components/Property/Modal/PropertyDepositSaveModal';
import PropertyDeleteModal from 'components/Property/Modal/PropertyDeleteModal';
import TitleHeader from 'components/common/Header/TitleHeader';
import { getRemainDate } from 'lib/util';

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
  }

  loadPropertyDetailInfo = () => {
    const { propertyDetailActions } = this.props;
    propertyDetailActions.loadPropertyDetailInfo(InitialPropertyDetailData);
  }

  togglePropertyModal = (modalType) => {
      const { propertyDetailActions } = this.props;
      propertyDetailActions.togglePropertyModal(modalType);
  }

  handleSaveDepositMoney = () => {
      console.log(1);
  }

    handlePropertyDelete = () => {
      console.log('삭제완료');
    }

  handleGetCurrentAmount = (amountList) => {
    return amountList.reduce((prev, save) => prev + save.depositAmount, 0);
  }

  handleGetRemainDatePercentage = (startDate, endDate) =>{
    const today = new Date();
    const totalDateCount = getRemainDate(startDate,endDate);
    const passDateCount = getRemainDate(startDate,today);
    const remainDate = (passDateCount / totalDateCount) * 100;
    return parseInt(remainDate,10);
  }

    handleChangeMonthlyDepositMoney = (e) => {
      const { propertyDetailActions } = this.props;
      propertyDetailActions.changeMonthlyDepositMoney(e.target.value);
  }

  render() {
    const {
        handleGetCurrentAmount,
        handleGetRemainDatePercentage,
        handleChangeMonthlyDepositMoney,
        handleSaveDepositMoney,
        handlePropertyDelete,
        togglePropertyModal
    } = this;
    const { propertyDetailInfo, modal, monthlyDepositMoney } = this.props;
    const propertyInfo = propertyDetailInfo.toJS();

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
                depositType={propertyInfo.depositType}
                depositList={propertyInfo.saveMoneyList}
                getCurrentAmount={handleGetCurrentAmount}
                getRemainDatePercentage={handleGetRemainDatePercentage}
                onDepositSaveClick={(e)=>{togglePropertyModal('deposit')}}
                onPropertyDeleteClick={(e)=>{togglePropertyModal('delete')}}
            />
            <PropertyDepositSaveModal
                modalVisible={modal.get('deposit')}
                monthlyDepositMoney={monthlyDepositMoney}
                toggleModal={(e)=>{togglePropertyModal('deposit')}}
                onMoneyChange={handleChangeMonthlyDepositMoney}
                onPropertyDepositSave={handleSaveDepositMoney}
            />
            <PropertyDeleteModal
                propertyTitle={propertyInfo.propertyTitle}
                modalVisible={modal.get('delete')}
                toggleModal={(e)=>{togglePropertyModal('delete')}}
                onPropertyDelete={handlePropertyDelete}
            />
        </div>

    );
  }
}
export default connect(
    (state) => ({
        propertyDetailInfo: state.propertyDetail.get('propertyDetailInfo'),
        monthlyDepositMoney : state.propertyDetail.get('monthlyDepositMoney'),
        modal : state.propertyDetail.get('modal')
    }),
    (dispatch) => ({
        propertyDetailActions: bindActionCreators(propertyDetailActions, dispatch),
    })
)(PropertyDetailContainer);