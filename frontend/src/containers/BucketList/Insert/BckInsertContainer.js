import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckInsertActions from 'store/modules/bckInsert';
import BckInsertForm from 'components/BucketList/Insert/BckInsertForm';
import TitleHeader from 'components/common/Header/TitleHeader';

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

   handleSaveBucketList = () => {
       const { handleValidateBckForm } = this;

       if(handleValidateBckForm()){

       }
   }

   handleValidateBckForm = () =>{
       const { bckTitle,
               targetAmount,
               currentAmount,
               completeDate,
               bckInsertActions}
       = this.props;

       const today = new Date();

       if(bckTitle.length <1 || bckTitle.length >9){
           bckInsertActions.setValidateErrorMessage('제목은 1~8글자 사이로 입력하세요.');
           return false;
       }

       if(Number.parseInt(targetAmount) === 0){
           bckInsertActions.setValidateErrorMessage('목표금액을 설정해주세요.');
           return false;
       }

       if(Number.parseInt(currentAmount) > Number.parseInt(targetAmount)){
           bckInsertActions.setValidateErrorMessage('초기금이 목표액보다 많습니다.');
           return false;
       }


       if(today >= new Date(completeDate)){
           bckInsertActions.setValidateErrorMessage('목표일은 오늘 이후로 정해주세요.');
           return false;
       }

       return true;

   }

  render() {
     const { bckTitle,
             bckDetail,
             targetAmount,
             currentAmount,
             completeDate }
     = this.props;

     const {
         handleChangeInputValue,
         handleSaveBucketList
     } = this;

    return (
      <div>
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
        validateErrMessage: state.bckInsert.get('validateErrMessage')
    }),
    (dispatch) => ({
        bckInsertActions: bindActionCreators(bckInsertActions, dispatch),
    })
)(BckInsertContainer);