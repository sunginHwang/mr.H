import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as propertySaveActions from 'store/modules/propertySave';
import PropertySaveForm from 'components/Property/Save/PropertySaveForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import ErrorBlock from 'components/common/Block/ErrorBlock';
import { depositSelectInfo } from 'lib/variables';
import { isBiggerThenToday, getRemainMonth } from 'lib/util';
import { SAVING_DEPOSIT } from 'lib/constants';


class PropertySaveContainer extends Component {


  componentDidUpdate(prevProps, prevState) {
    const { targetAmount, completeDate, depositType, propertySaveActions } = this.props;
    const isSavingDepositChange = depositType == SAVING_DEPOSIT &&
                                  (
                                      prevProps.targetAmount !== targetAmount ||
                                      prevProps.completeDate !== completeDate
                                  );
    isSavingDepositChange &&
            propertySaveActions.changeInputValue({inputType : 'monthlyDepositAmount', value : this.calcMonthlyDepositAmount()});
  }

    componentWillUnmount() {
        this.props.propertySaveActions.initiatePropertyInfo();
    }

  calcMonthlyDepositAmount = () => {
      const {targetAmount, completeDate} = this.props;
      const today = new Date();
      return parseInt(targetAmount / getRemainMonth(today,completeDate));
  }

  handlePropertySaveChangeInputValue = (type, e) =>{
    const {propertySaveActions} = this.props;
    const { value } = e.target;
    const inputParam = {inputType : type, value : value};

    if(this.validatePropertyInputChange(type, value)){
        propertySaveActions.changeInputValue(inputParam);
    }

  }

  SetErrorMsg = (ErrMsg) => {
      const { propertySaveActions } = this.props;
      const timer = 800;
      propertySaveActions.setValidateErrorMessage(ErrMsg);
      setTimeout(() => propertySaveActions.setValidateErrorMessage(''), timer);
  }

  validatePropertyInputChange = (type, value) => {
      const { SetErrorMsg } = this;
      if(type === 'completeDate' && isBiggerThenToday(value)){
          SetErrorMsg('날짜가 너무 이릅니다. 오늘 이후로 설정해주세요.');
          return false;
      }
      return true;
  }

  validatePropertySaveForm = () => {
      const { SetErrorMsg } = this;
      const { depositType, propertyTitle, targetAmount, completeDate,} = this.props;
      const depositTypeName = depositType === SAVING_DEPOSIT ? '적금' : '예금';

      if(Number.parseInt(depositType,10) === 0){
          SetErrorMsg('예금, 적금 종류를 선택해주세요.');
          return false;
      }

      if(propertyTitle.length <2 || propertyTitle.length >11){
          SetErrorMsg(depositTypeName+'명을 2~10글자 사이로 입력하세요.');
          return false;
      }

      if(isBiggerThenToday(completeDate)){
          SetErrorMsg('만기일이 너무 이릅니다. 오늘 이후로 설정해주세요.');
          return false;
      }

      if(completeDate === ''){
          SetErrorMsg('만기일 날짜 형식을 제대로 입력해주세요.');
          return false;
      }

      if(Number.parseInt(targetAmount,10) <= 0){
          SetErrorMsg(depositTypeName+'액을 0원이상 입력해주세요.');
          return false;
      }



      return true;
  }

  handlePropertySave = async () => {
      const { validatePropertySaveForm, SetErrorMsg } = this;
      const { saveErrMessage } = this.props;

      if(validatePropertySaveForm()){
          try{
              await console.log('saveProcess');
              await alert('예, 적금 작성 완료.');
          }catch(e){
              await SetErrorMsg(saveErrMessage);
          }
      }
  }



  render() {
    const {
        depositType,
        propertyTitle,
        targetAmount,
        monthlyDepositAmount,
        completeDate,
        validateErrMessage
    } = this.props;
    const { handlePropertySaveChangeInputValue, handlePropertySave } = this;

    return (
        <div>
            <TitleHeader
                iconColor='black'
                iconSize='large'
                titleName='예금, 적금 입력'
            />
            {validateErrMessage !== '' &&
            <ErrorBlock
                errorMessage={validateErrMessage}
                positon='top'/>
            }
            <PropertySaveForm
                propertyTitle={propertyTitle}
                targetAmount={targetAmount}
                monthlyDepositAmount={monthlyDepositAmount}
                completeDate={completeDate}
                depositSelectInfo={depositSelectInfo}
                depositType={Number.parseInt(depositType,10)}
                onChangeValue={handlePropertySaveChangeInputValue}
                onSaveClick={handlePropertySave}
            />
        </div>

    );
  }
}
export default connect(
    (state) => ({
        propertyIdx : state.propertySave.getIn(['propertyInfo','propertyIdx']),
        propertyTitle : state.propertySave.getIn(['propertyInfo','propertyTitle']),
        targetAmount : state.propertySave.getIn(['propertyInfo','targetAmount']),
        monthlyDepositAmount : state.propertySave.getIn(['propertyInfo','monthlyDepositAmount']),
        completeDate : state.propertySave.getIn(['propertyInfo','completeDate']),
        depositType: state.propertySave.getIn(['propertyInfo','depositType']),
        validateErrMessage: state.propertySave.getIn(['error','validateErrMessage']),
        saveErrMessage: state.propertySave.getIn(['error','saveErrMessage'])
    }),
    (dispatch) => ({
        propertySaveActions: bindActionCreators(propertySaveActions, dispatch),
    })
)(PropertySaveContainer);