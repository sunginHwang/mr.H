import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as propertyDetailActions from 'store/modules/propertyDetail';
import PropertyDetailForm from 'components/Property/Detail/PropertyDetailForm';
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

  render() {
    const { handleGetCurrentAmount, handleGetRemainDatePercentage } = this;
    const { propertyDetailInfo } = this.props;
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
            />
        </div>

    );
  }
}
export default connect(
    (state) => ({
        propertyDetailInfo: state.propertyDetail.get('propertyDetailInfo')
    }),
    (dispatch) => ({
        propertyDetailActions: bindActionCreators(propertyDetailActions, dispatch),
    })
)(PropertyDetailContainer);