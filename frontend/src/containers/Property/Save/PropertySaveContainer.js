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
    const { targetAmount, completeDate, depositType, propertySaveActions } = this.props;
    const isSavingDepositChange = depositType == SAVING_DEPOSIT &&
                                  (
                                      prevProps.targetAmount !== targetAmount ||
                                      prevProps.completeDate !== completeDate
                                  );
    isSavingDepositChange &&
            propertySaveActions.changeInputValue({inputType : 'monthlyDepositAmount', value : calcMonthlyDepositMoney(targetAmount,completeDate)});
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

  }

  validatePropertyInputChange = (type, value) => {
      const { setErrorMessage } = this.props;
      if(type === 'completeDate' && isBiggerThenToday(value)){
          setErrorMessage('날짜가 너무 이릅니다. 오늘 이후로 설정해주세요.');
          return false;
      }
      return true;
  }

  validatePropertySaveForm = () => {
      const { depositType, propertyTitle, targetAmount, completeDate, setErrorMessage } = this.props;
      const depositTypeName = depositType === SAVING_DEPOSIT ? '적금' : '예금';

      if(Number.parseInt(depositType,10) === 0){
          setErrorMessage('예금, 적금 종류를 선택해주세요.');
          return false;
      }

      if(propertyTitle.length <2 || propertyTitle.length >11){
          setErrorMessage(depositTypeName+'명을 2~10글자 사이로 입력하세요.');
          return false;
      }

      if(isBiggerThenToday(completeDate)){
          setErrorMessage('만기일이 너무 이릅니다. 오늘 이후로 설정해주세요.');
          return false;
      }

      if(completeDate === ''){
          setErrorMessage('만기일 날짜 형식을 제대로 입력해주세요.');
          return false;
      }

      if(Number.parseInt(targetAmount,10) <= 0){
          setErrorMessage(depositTypeName+'액을 0원이상 입력해주세요.');
          return false;
      }



      return true;
  }

  handlePropertySave = async () => {
      const { validatePropertySaveForm } = this;
      const { setErrorMessage } = this.props;

      if(validatePropertySaveForm()){
          try{
              await console.log('saveProcess');
              await alert('예, 적금 작성 완료.');
          }catch(e){
              await setErrorMessage('적금 저장 실패');
          }
      }
  }



  render() {
    const {
        depositType,
        propertyTitle,
        targetAmount,
        monthlyDepositAmount,
        completeDate
    } = this.props;
    const { handlePropertySaveChangeInputValue, handlePropertySave } = this;

    return (
        <div>
            <TitleHeader
                iconColor='black'
                iconSize='large'
                titleName='예금, 적금 입력'
            />
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
export default WithError(connect(
    (state) => ({
        propertyIdx : state.propertySave.getIn(['propertyInfo','propertyIdx']),
        propertyTitle : state.propertySave.getIn(['propertyInfo','propertyTitle']),
        targetAmount : state.propertySave.getIn(['propertyInfo','targetAmount']),
        monthlyDepositAmount : state.propertySave.getIn(['propertyInfo','monthlyDepositAmount']),
        completeDate : state.propertySave.getIn(['propertyInfo','completeDate']),
        depositType: state.propertySave.getIn(['propertyInfo','depositType'])
    }),
    (dispatch) => ({
        propertySaveActions: bindActionCreators(propertySaveActions, dispatch),
    })
)(PropertySaveContainer));

