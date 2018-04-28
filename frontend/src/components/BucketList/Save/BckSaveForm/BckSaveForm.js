import React from 'react';
import InputLabel from 'components/common/Input/InputLabel';
import SelectLabel from 'components/common/Input/SelectLabel';
import TextAreaLabel from 'components/common/Input/TextAreaLabel';
import BottomButton from 'components/common/Button/BottomButton';
import CardBlock from 'components/common/Block/CardBlock';
import { MONEY_COMPLETE } from 'lib/constants';
import './BckSaveForm.css';

const BckSaveForm = ({
    bckTitle,
    bckDetail,
    targetAmount,
    currentAmount,
    completeType,
    completeDate,
    saveMode,
    bckSelectOptionInfo,
    onChangeInput,
    onChangeFirstDeposit,
    onSaveClick,
}) => {
    const optionList = bckSelectOptionInfo.map((dataInfo) => (
        <option key={dataInfo.value} value={dataInfo.value}>{dataInfo.text}</option>
    ));

  return (
      <div className='bck-save-form'>
          <CardBlock>
              <InputLabel
                  labelName='버킷리스트명'
                  placeHolderName='8글자 이하로 입력하세요.'
                  inputValue={bckTitle}
                  inputType='text'
                  onInputChange={(e)=>{onChangeInput('bckTitle',e)}}
              />
              <InputLabel
                  labelName='목표달성일'
                  placeHolderName=''
                  inputValue={completeDate}
                  inputType='date'
                  onInputChange={(e)=>{onChangeInput('completeDate',e)}}
              />
              {
                  saveMode === 'insert' &&
                  <SelectLabel
                      labelName='목표달성 방법을 선택해주세요.'
                      onSelectChange={(e)=>{onChangeInput('typeIdx',e)}}
                      optionList={optionList}/>
              }

              {
                  saveMode === 'insert' && completeType === MONEY_COMPLETE &&
                  <div>
                      <InputLabel
                          labelName='목표달성액'
                          placeHolderName='ex.) 10000'
                          inputValue={targetAmount}
                          inputType='number'
                          onInputChange={(e)=>{onChangeInput('targetAmount',e)}}
                      />
                      <InputLabel
                          labelName='초기 자본금'
                          placeHolderName='목표달성액 이하로 적어주세요.'
                          inputValue={currentAmount}
                          inputType='number'
                          onInputChange={(e)=>{onChangeFirstDeposit(e)}}
                      />
                  </div>

              }

              {
                  saveMode !== 'insert' && completeType === MONEY_COMPLETE &&
                  <div>
                      <InputLabel
                          labelName='목표달성액'
                          placeHolderName='ex.) 10000'
                          inputValue={targetAmount}
                          inputType='number'
                          onInputChange={(e)=>{onChangeInput('targetAmount',e)}}
                      />
                  </div>

              }

              <TextAreaLabel
                  labelName='상세내용'
                  placeHolderName='버킷리스트를 이루기 위한 구체적 설명을 적어주세요..'
                  TextAreaHeight='150'
                  textAreaValue={bckDetail}
                  onTextAreaChange={(e)=>{onChangeInput('bckDetail',e);}}
              />
          </CardBlock>
          <BottomButton
            bottomButtonName={saveMode === 'insert' ? '저장하기' : '수정하기'}
            onButtonClick={onSaveClick}
            color='whiteBlue'
          />
      </div>

  );
};

export default BckSaveForm;