import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckInsertActions from 'store/modules/bckInsert';
import BckInsertForm from 'components/BucketList/Insert/BckInsertForm';
import TitleHeader from 'components/common/Header/TitleHeader';

class BckInsertContainer extends Component {

   componentDidMount(){
       console.log(12);
   }
  render() {
     const { bckTitle,
             bckDetail,
             targetAmount,
             currentAmount,
             completeDate }
     = this.props;

    return (
      <div>
        <TitleHeader
            iconSize='large'
            iconColor='black'
            titleName='버킷리스트 입력'/>
        <BckInsertForm
            bckTitle = {bckTitle}
            bckDetail = {bckDetail}
            targetAmount = {targetAmount}
            currentAmount = {currentAmount}
            completeDate = {completeDate}
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
        completeDate :state.bckInsert.get('completeDate')
    }),
    (dispatch) => ({
        bckInsertActions: bindActionCreators(bckInsertActions, dispatch),
    })
)(BckInsertContainer);