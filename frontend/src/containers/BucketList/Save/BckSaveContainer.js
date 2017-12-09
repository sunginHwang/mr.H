import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckSaveActions from 'store/modules/bckSave';
import BckSaveForm from 'components/BucketList/Save/BckSaveForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import WithError from 'hoc/WithError';
import { bckCompleteSelectInfo } from 'lib/variables';
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
       bckMode ==='modify' && this.getModifyData(bckIdx);
   }

   getModifyData = (bckIdx) => {
       this.props.bckSaveActions.getBckModifyInfo(bckIdx);
   }

   handleChangeInputValue = (type, e) =>{
       const {bckSaveActions} = this.props;
       const { value } = e.target;
       const inputParam = {inputType : type, value : value};
       bckSaveActions.changeInputValue(inputParam);
   }

   handleChangeDepositMoney = (e) => {
       const {bckSaveActions} = this.props;
       bckSaveActions.changeFirstDeposit(e.target.value);
   }

   handleSaveBucketList = async () => {
       const { handleValidateBckForm } = this;
       const { mode } = this.state;
       const { withSetErrorMessage, bckSaveActions, bckInfo, currentAmount } = this.props;

       if(handleValidateBckForm()){
           try{
               await mode === 'insert' ? await bckSaveActions.insertBckInfo(bckInfo.typeIdx,bckInfo, currentAmount)
                                       : await bckSaveActions.modifyBckInfo(bckInfo.bckIdx, bckInfo);
               await alert(this.props.notifyMessage);
               await this.props.history.goBack();
           }catch(e){
               await withSetErrorMessage(this.props.notifyMessage);
           }
       }
   }

   handleValidateBckForm = () =>{
       const { bckInfo, currentAmount, withSetErrorMessage} = this.props;
       const { bckTitle, targetAmount, typeIdx, completeDate } = bckInfo;


       const today = new Date();

       if(bckTitle.length <1 || bckTitle.length >9){
           withSetErrorMessage('제목은 1~8글자 사이로 입력하세요.');
           return false;
       }

       if(today >= new Date(completeDate)){
           withSetErrorMessage('목표달성일은 오늘 이후로 정해주세요.');
           return false;
       }

       if(parseInt(typeIdx,10) === 0){
           withSetErrorMessage('목표 달성 타입을 선택해주세요.');
           return false;
       }

       if(parseInt(typeIdx,10) === MONEY_COMPLETE &&
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
     const { bckInfo, currentAmount }= this.props;


     const {
         handleChangeInputValue,
         handleSaveBucketList,
         handleChangeDepositMoney
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
            bckTitle={bckInfo.bckTitle}
            bckDetail={bckInfo.bckDetail}
            targetAmount={bckInfo.targetAmount}
            currentAmount={currentAmount}
            completeDate={bckInfo.completeDate}
            completeType={Number.parseInt(bckInfo.typeIdx,10)}
            bckSelectOptionInfo={bckCompleteSelectInfo}
            saveMode={mode}
            onChangeInput={handleChangeInputValue}
            onChangeFirstDeposit={handleChangeDepositMoney}
            onSaveClick={handleSaveBucketList}
        />
      </div>
    );
  }
}
export default WithError(connect(
    (state) => ({
        bckInfo: state.bckSave.get('bckInfo').toJS(),
        notifyMessage : state.bckSave.get('notifyMessage'),
        currentAmount: state.bckSave.get('currentAmount')
    }),
    (dispatch) => ({
        bckSaveActions: bindActionCreators(bckSaveActions, dispatch),
    })
)(BckSaveContainer));