import React from 'react';
import SelectLabel from 'components/common/Input/SelectLabel';
import InputLabel from 'components/common/Input/InputLabel';
import BottomButton from 'components/common/Button/BottomButton';
import CardBlock from 'components/common/Block/CardBlock';
import { FIXED_DEPOSIT, SAVING_DEPOSIT } from 'lib/constants';

import './PropertySaveForm.css';

const PropertySaveForm = ({
    propertyTitle,
    completeDate,
    targetAmount,
    monthlyDepositAmount,
    depositSelectInfo,
    depositType,
    onChangeValue,
    onSaveClick
}) => {

  const optionList = depositSelectInfo.map((dataInfo) => (
      <option key={dataInfo.value} value={dataInfo.value}>{dataInfo.text}</option>
  ));

  return (
    <div>
        <CardBlock>

            {
                depositType !== 0 &&
                <div className='input-area'>
                    <InputLabel
                        labelName={depositType === FIXED_DEPOSIT ? '예금명' : '적금명'}
                        placeHolderName='10글자 이하로 입력하세요.'
                        inputValue={propertyTitle}
                        inputType='text'
                        onInputChange={(e)=>{onChangeValue('propertyTitle',e)}}
                    />
                    <InputLabel
                        labelName='만기일'
                        inputValue={completeDate}
                        inputType='date'
                        onInputChange={(e)=>{onChangeValue('completeDate',e)}}
                    />
                    <InputLabel
                        labelName={depositType === FIXED_DEPOSIT ? '예금액' : '적금목표금'}
                        placeHolderName='8글자 이하로 입력하세요.'
                        inputValue={targetAmount}
                        inputType='number'
                        onInputChange={(e)=>{onChangeValue('targetAmount',e)}}
                    />
                </div>
            }
            {
                depositType === SAVING_DEPOSIT &&
                <InputLabel
                    labelName='월 예상 납부액'
                    placeHolderName=''
                    inputValue={monthlyDepositAmount}
                    inputType='number'
                    onInputChange={(e)=>{onChangeValue('monthlyDepositAmount',e)}}
                />
            }


        </CardBlock>
        <BottomButton
            bottomButtonName='저장하기'
            onButtonClick={onSaveClick}
            color='whiteBlue'
        />
    </div>
  )
};
 
export default PropertySaveForm;