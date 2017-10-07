import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckInsertActions from 'store/modules/bckInsert';
import BckInsertForm from 'components/BucketList/Insert/BckInsertForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import ErrorBlock from 'components/common/Block/ErrorBlock';

class BckInsertContainer extends Component {

   componentDidMount(){
       console.log('coming bckInsertContainer');
   }

   handleChangeInputValue = (type, e)=>{
       const {bckInsertActions} = this.props;
       const { value } = e.target;
       const inputParam = {inputType : type, value : value};
       bckInsertActions.changeInputValue(inputParam);
   }

   handleSaveBucketList = async () => {
       const { handleValidateBckForm,
               handleSetErrorMsg }
       = this;

       const { saveErrMessage } = this.props;

       if(handleValidateBckForm()){
           try{
               throw "InvalidMonthNo";
               await console.log('saveProcess');
               await alert('버킷리스트 작성 완료.');
           }catch(e){
               await handleSetErrorMsg(saveErrMessage);
           }
       }
   }

   handleSetErrorMsg = (ErrMsg) => {
       const { bckInsertActions }= this.props;
       const timer = 800;
       bckInsertActions.setValidateErrorMessage(ErrMsg);
       setTimeout(() => bckInsertActions.setValidateErrorMessage(''), timer);

   }

   handleValidateBckForm = () =>{
       const { bckTitle,
               targetAmount,
               currentAmount,
               completeDate}
       = this.props;

       const { handleSetErrorMsg } = this;

       const today = new Date();

       if(bckTitle.length <1 || bckTitle.length >9){
           handleSetErrorMsg('제목은 1~8글자 사이로 입력하세요.');
           return false;
       }

       if(Number.parseInt(targetAmount) === 0){
           handleSetErrorMsg('목표금액을 설정해주세요.');
           return false;
       }

       if(Number.parseInt(currentAmount) > Number.parseInt(targetAmount)){
           handleSetErrorMsg('초기금이 목표액보다 많습니다.');
           return false;
       }

       if(today >= new Date(completeDate)){
           handleSetErrorMsg('목표일은 오늘 이후로 정해주세요.');
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
             validateErrMessage}
     = this.props;

     const {
         handleChangeInputValue,
         handleSaveBucketList
     } = this;

    return (
      <div>
        <TitleHeader
            iconColor='black'
            iconSize='large'
            titleName='버킷리스트 작성'
        />
        {validateErrMessage != '' &&
          <ErrorBlock
             errorMessage={validateErrMessage}
             positon='top'/>
        }
        <BckInsertForm
            bckTitle = {bckTitle}
            bckDetail = {bckDetail}
            targetAmount = {targetAmount}
            currentAmount = {currentAmount}
            completeDate = {completeDate}
            onChangeInput = {handleChangeInputValue}
            onSaveClick = {handleSaveBucketList}
        />
      </div>
    );
  }
}
export default connect(
    (state) => ({
        bckTitle: state.bckInsert.get('bckTitle'),
        bckDetail: state.bckInsert.get('bckDetail'),
        targetAmount: state.bckInsert.get('targetAmount'),
        currentAmount: state.bckInsert.get('currentAmount'),
        completeDate :state.bckInsert.get('completeDate'),
        validateErrMessage: state.bckInsert.get('validateErrMessage'),
        saveErrMessage: state.bckInsert.get('saveErrMessage')
    }),
    (dispatch) => ({
        bckInsertActions: bindActionCreators(bckInsertActions, dispatch),
    })
)(BckInsertContainer);