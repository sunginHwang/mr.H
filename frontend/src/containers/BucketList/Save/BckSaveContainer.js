import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckSaveActions from 'store/modules/bckSave';
import BckSaveForm from 'components/BucketList/Save/BckSaveForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import ErrorBlock from 'components/common/Block/ErrorBlock';
import WithError from 'hoc/WithError';
import { InitinalBckModifyData, bckCompleteSelectInfo } from 'lib/variables';
import { MONEY_COMPLETE, DATE_COMPLETE } from 'lib/constants';

class BckSaveContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {mode: 'insert'};
    }

   componentDidMount(){
       this.checkSaveMode();
   }

    componentWillUnmount() {
        this.props.bckSaveActions.initiateBckInfo();
    }

   checkSaveMode = () => {
       const { bckIdx } = this.props.match.params;
       const bckMode = bckIdx ? 'modify' : 'insert';
       this.setState({mode: bckMode});
       bckMode ==='modify' && this.getModifyData();
   }

   getModifyData = () => {
       this.props.bckSaveActions.getBckModifyInfo(InitinalBckModifyData);
   }

   handleChangeInputValue = (type, e) =>{
       const {bckSaveActions} = this.props;
       const { value } = e.target;
       const inputParam = {inputType : type, value : value};
       bckSaveActions.changeInputValue(inputParam);
   }

   handleSaveBucketList = async () => {
       const { handleValidateBckForm } = this;
       const { withSetErrorMessage } = this.props;

       if(handleValidateBckForm()){
           try{
               throw "InvalidMonthNo";
               await console.log('saveProcess');
               await alert('버킷리스트 작성 완료.');
           }catch(e){
               await withSetErrorMessage('저장 실패');
           }
       }
   }

   handleValidateBckForm = () =>{
       const { bckTitle, targetAmount, currentAmount, completeType, completeDate, withSetErrorMessage} = this.props;


       const today = new Date();

       if(bckTitle.length <1 || bckTitle.length >9){
           withSetErrorMessage('제목은 1~8글자 사이로 입력하세요.');
           return false;
       }

       if(today >= new Date(completeDate)){
           withSetErrorMessage('목표달성일은 오늘 이후로 정해주세요.');
           return false;
       }

       if(parseInt(completeType,10) === 0){
           withSetErrorMessage('목표 달성 타입을 선택해주세요.');
           return false;
       }

       if(parseInt(completeType,10) === MONEY_COMPLETE &&
         (parseInt(targetAmount,10) === 0 || !targetAmount)){
           withSetErrorMessage('목표금액을 설정해주세요.');
           return false;
       }

       if(parseInt(currentAmount,10) > parseInt(targetAmount,10)){
           withSetErrorMessage('초기금이 목표액보다 많습니다.');
           return false;
       }



       return true;

   }


  render() {
     const { bckTitle,
             bckDetail,
             targetAmount,
             currentAmount,
             completeDate,
             completeType}
     = this.props;

     const { bckMode } = this.state;

     const {
         handleChangeInputValue,
         handleSaveBucketList
     } = this;

     const { mode } = this.state;
     const titleName = mode === 'insert' ? '버킷리스트 작성 ' : '버킷리스트 수정';

    return (
      <div>
        <TitleHeader
            iconColor='black'
            iconSize='large'
            titleName={titleName}
        />
        <BckSaveForm
            bckTitle={bckTitle}
            bckDetail={bckDetail}
            targetAmount={targetAmount}
            currentAmount={currentAmount}
            completeDate={completeDate}
            completeType={Number.parseInt(completeType,10)}
            bckSelectOptionInfo={bckCompleteSelectInfo}
            saveMode={mode}
            onChangeInput={handleChangeInputValue}
            onSaveClick={handleSaveBucketList}
        />
      </div>
    );
  }
}
export default WithError(connect(
    (state) => ({
        bckTitle: state.bckSave.getIn(['bckInfo','bckTitle']),
        bckDetail: state.bckSave.getIn(['bckInfo','bckDetail']),
        targetAmount: state.bckSave.getIn(['bckInfo','targetAmount']),
        currentAmount: state.bckSave.getIn(['bckInfo','currentAmount']),
        completeDate :state.bckSave.getIn(['bckInfo','completeDate']),
        completeType :state.bckSave.getIn(['bckInfo','completeType']),
    }),
    (dispatch) => ({
        bckSaveActions: bindActionCreators(bckSaveActions, dispatch),
    })
)(BckSaveContainer));