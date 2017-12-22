import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import WithError from 'hoc/WithError';
import * as propertySaveActions from 'store/modules/propertySave';
import PropertySaveForm from 'components/Property/Save/PropertySaveForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import { depositSelectInfo } from 'lib/variables';
import { isBiggerThenToday, getRemainMonth, calcMonthlyDepositMoney } from 'lib/util';
import { SAVING_DEPOSIT } from 'lib/constants';


class PropertySaveContainer extends Component {


  componentDidUpdate(prevProps, prevState) {
    const { propertyInfo, propertySaveActions } = this.props;
    const isSavingDepositChange = propertyInfo.depositType == SAVING_DEPOSIT && (
                                      prevProps.propertyInfo.targetAmount !== propertyInfo.targetAmount ||
                                      prevProps.propertyInfo.completeDate !== propertyInfo.completeDate
                                  );

      isSavingDepositChange &&
            propertySaveActions.changeInputValue({inputType : 'monthlyDepositAmount', value : calcMonthlyDepositMoney(propertyInfo.targetAmount,propertyInfo.completeDate)});
  }

    componentWillUnmount() {
        this.props.propertySaveActions.initiatePropertyInfo();
    }

  handlePropertySaveChangeInputValue = (type, e) =>{
    const {propertySaveActions} = this.props;
    const { value } = e.target;
    const inputParam = {inputType : type, value : value};

    if(this.validatePropertyInputChange(type, value)){
        propertySaveActions.changeInputValue(inputParam);
    }

  };

  validatePropertyInputChange = (type, value) => {
      const { withSetErrorMessage } = this.props;
      if(type === 'completeDate' && isBiggerThenToday(value)){
          withSetErrorMessage('날짜가 너무 이릅니다. 오늘 이후로 설정해주세요.');
          return false;
      }
      return true;
  }

  validatePropertySaveForm = () => {
      const { propertyInfo, withSetErrorMessage } = this.props;
      const { depositType, propertyTitle, targetAmount, completeDate } = propertyInfo;
      const depositTypeName = depositType === SAVING_DEPOSIT ? '적금' : '예금';

      if(Number.parseInt(depositType,10) === 0){
          withSetErrorMessage('예금, 적금 종류를 선택해주세요.');
          return false;
      }

      if(propertyTitle.length <2 || propertyTitle.length >11){
          withSetErrorMessage(depositTypeName+'명을 2~10글자 사이로 입력하세요.');
          return false;
      }

      if(isBiggerThenToday(completeDate)){
          withSetErrorMessage('만기일이 너무 이릅니다. 오늘 이후로 설정해주세요.');
          return false;
      }

      if(completeDate === ''){
          withSetErrorMessage('만기일 날짜 형식을 제대로 입력해주세요.');
          return false;
      }

      if(Number.parseInt(targetAmount,10) <= 0){
          withSetErrorMessage(depositTypeName+'액을 0원이상 입력해주세요.');
          return false;
      }

      return true;
  };

  handlePropertySave = async (propertySaveInfo) => {
      const { validatePropertySaveForm } = this;
      const { withSetErrorMessage, propertySaveActions } = this.props;

      if(validatePropertySaveForm()){
          try{
              await propertySaveActions.insertProperty(propertySaveInfo.depositType,propertySaveInfo);
              await alert(this.props.notifyMessage);
              await this.props.history.goBack();
          }catch(e){
              await withSetErrorMessage(this.props.notifyMessage);
          }
      }
  };



  render() {
    const { propertyInfo } = this.props;
    const { handlePropertySaveChangeInputValue, handlePropertySave } = this;

    return (
        <div>
            <TitleHeader
                iconColor='black'
                iconSize='large'
                titleName='예금, 적금 입력'
            />
            <PropertySaveForm
                propertyTitle={propertyInfo.propertyTitle}
                targetAmount={propertyInfo.targetAmount}
                monthlyDepositAmount={propertyInfo.monthlyDepositAmount}
                completeDate={propertyInfo.completeDate}
                depositSelectInfo={depositSelectInfo}
                depositType={Number.parseInt(propertyInfo.depositType,10)}
                onChangeValue={handlePropertySaveChangeInputValue}
                onSaveClick={(e)=>{handlePropertySave(propertyInfo)}}
            />
        </div>

    );
  }
}
export default WithError(connect(
    (state) => ({
        propertyInfo : state.propertySave.get('propertyInfo').toJS(),
        notifyMessage : state.propertySave.get('notifyMessage')
    }),
    (dispatch) => ({
        propertySaveActions: bindActionCreators(propertySaveActions, dispatch),
    })
)(PropertySaveContainer));

