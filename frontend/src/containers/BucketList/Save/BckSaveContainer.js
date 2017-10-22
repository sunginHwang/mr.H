import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckSaveActions from 'store/modules/bckSave';
import BckSaveForm from 'components/BucketList/Save/BckSaveForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import ErrorBlock from 'components/common/Block/ErrorBlock';
import { InitinalBckModifyData } from 'lib/variables';

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
       const { handleValidateBckForm, handleSetErrorMsg } = this;
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

   handleValidateBckForm = () =>{
       const { bckTitle, targetAmount, currentAmount, completeDate} = this.props;

       const { handleSetErrorMsg } = this;

       const today = new Date();

       if(bckTitle.length <1 || bckTitle.length >9){
           handleSetErrorMsg('제목은 1~8글자 사이로 입력하세요.');
           return false;
       }

       if(Number.parseInt(targetAmount,10) === 0 || !targetAmount){
           handleSetErrorMsg('목표금액을 설정해주세요.');
           return false;
       }

       if(Number.parseInt(currentAmount,10) > Number.parseInt(targetAmount,10)){
           handleSetErrorMsg('초기금이 목표액보다 많습니다.');
           return false;
       }

       if(today >= new Date(completeDate)){
           handleSetErrorMsg('목표일은 오늘 이후로 정해주세요.');
           return false;
       }

       return true;

   }

    handleSetErrorMsg = (ErrMsg) => {
        const { bckSaveActions } = this.props;
        const timer = 800;
        bckSaveActions.setValidateErrorMessage(ErrMsg);
        setTimeout(() => bckSaveActions.setValidateErrorMessage(''), timer);
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

     const { mode } = this.state;
     const titleName = mode === 'insert' ? '버킷리스트 작성 ' : '버킷리스트 수정';

    return (
      <div>
        <TitleHeader
            iconColor='black'
            iconSize='large'
            titleName={titleName}
        />
        {validateErrMessage !== '' &&
          <ErrorBlock
             errorMessage={validateErrMessage}
             positon='top'/>
        }
        <BckSaveForm
            bckTitle={bckTitle}
            bckDetail={bckDetail}
            targetAmount={targetAmount}
            currentAmount={currentAmount}
            completeDate={completeDate}
            onChangeInput={handleChangeInputValue}
            onSaveClick={handleSaveBucketList}
        />
      </div>
    );
  }
}
export default connect(
    (state) => ({
        bckTitle: state.bckSave.getIn(['bckInfo','bckTitle']),
        bckDetail: state.bckSave.getIn(['bckInfo','bckDetail']),
        targetAmount: state.bckSave.getIn(['bckInfo','targetAmount']),
        currentAmount: state.bckSave.getIn(['bckInfo','currentAmount']),
        completeDate :state.bckSave.getIn(['bckInfo','completeDate']),
        validateErrMessage: state.bckSave.getIn(['error','validateErrMessage']),
        saveErrMessage: state.bckSave.getIn(['error','saveErrMessage'])
    }),
    (dispatch) => ({
        bckSaveActions: bindActionCreators(bckSaveActions, dispatch),
    })
)(BckSaveContainer);