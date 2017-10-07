import React from 'react';
import InputLabel from 'components/common/Input/InputLabel';
import TextAreaLabel from 'components/common/Input/TextAreaLabel';
import SaveButton from 'components/common/Button/SaveButton';

import './BckInsertForm.css';

const BckInsertForm = ({
    bckTitle,
    bckDetail,
    targetAmount,
    currentAmount,
    completeDate,
    onChangeInput,
    onSaveClick
}) => {
  return (
      <div className="bck-insert-form">
          <InputLabel
            labelName='버킷리스트명'
            placeHolderName='8글자 이하로 입력하세요.'
            inputValue={bckTitle}
            inputType='inputType'
            onInputChange={(event)=>{onChangeInput('bckTitle',event)}}
          />
          <InputLabel
              labelName='목표달성일'
              placeHolderName=''
              inputValue={completeDate}
              inputType='date'
              onInputChange={(event)=>{onChangeInput('completeDate',event)}}
          />
          <InputLabel
              labelName='목표달성액'
              placeHolderName='ex.) 10000'
              inputValue={targetAmount}
              inputType='number'
              onInputChange={(event)=>{onChangeInput('targetAmount',event)}}
          />
          <InputLabel
              labelName='초기 자본금'
              placeHolderName='목표달성액 이하로 적어주세요.'
              inputValue={currentAmount}
              inputType='number'
              onInputChange={(event)=>{onChangeInput('currentAmount',event)}}
          />
          <TextAreaLabel
              labelName='상세내용'
              placeHolderName='버킷리스트를 이루기 위한 구체적 설명을 적어주세요..'
              TextAreaHeight = '150'
              textAreaValue={bckDetail}
              onTextAreaChange={(event)=>{onChangeInput('bckDetail',event);}}
          />
          <SaveButton
            saveButtonName='버킷리스트 저장'
            onSaveClick={onSaveClick}
            color='teals'
          />
      </div>

  );
};

export default BckInsertForm;