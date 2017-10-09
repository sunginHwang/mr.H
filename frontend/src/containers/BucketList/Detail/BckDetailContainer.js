import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckDetailActions from 'store/modules/bckDetail';

import { InitinalBckDetailData } from 'lib/variables';

class BckDetailContainer extends Component {

    componentDidMount(){
       this.checkBckDetailAccess();
       this.loadBckDetailInfo();
    }

    checkBckDetailAccess(){
        const { bckIdx } = this.props.match.params;
        if(!Number.isInteger(Number.parseInt(bckIdx))){
            alert('정상적인 접근이 아닙니다.');
            this.props.history.push('/bck');
        }
    }
    
   loadBckDetailInfo(){
       const { bckDetailActions } = this.props;
       bckDetailActions.loadBckDetailInfo(InitinalBckDetailData);
   }


  render() {
   const { bckIdx } = this.props.match.params;
   let {bckDetailInfo} = this.props;
   bckDetailInfo = bckDetailInfo.toJS();

   const bckDepositList = bckDetailInfo.depositList.map((depositInfo) => (
       <div key={depositInfo.depositIdx}>
           <span>depositIdx: {depositInfo.depositIdx} : </span>
           <span>{depositInfo.depositDate} : </span>
           <span>{depositInfo.depositAmount}</span>
       </div>
  ));

    return (
        <div>
            <div><span>BckIdx : </span><span>{bckDetailInfo.bckIdx}</span></div>
            <div><span>targetAmount : </span><span>{bckDetailInfo.targetAmount}</span></div>
            <div><span>currentAmount : </span><span>{bckDetailInfo.currentAmount}</span></div>
            <div><span>bckTitle : </span><span>{bckDetailInfo.bckTitle}</span></div>
            <div><span>bckDetail : </span><span>{bckDetailInfo.bckDetail}</span></div>
            {bckDepositList}
        </div>
    );
  }
}

export default connect(
    (state) => ({
        bckDetailInfo: state.bckDetail.get('bckDetailInfo')
    }),
    (dispatch) => ({
        bckDetailActions: bindActionCreators(bckDetailActions, dispatch),
    })
)(BckDetailContainer);