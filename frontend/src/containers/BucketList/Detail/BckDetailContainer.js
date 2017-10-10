import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckDetailActions from 'store/modules/bckDetail';
import BckDetailForm from 'components/BucketList/Detail/BckDetailForm';
import TitleHeader from 'components/common/Header/TitleHeader';
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
   const {bckDetailInfo} = this.props;
   const bckInfo = bckDetailInfo.toJS();

    return (
        <div>
            <TitleHeader
                iconColor='black'
                iconSize='large'
                titleName={bckInfo.bckTitle}
            />
            <BckDetailForm
                bckIdx = {bckInfo.bckIdx}
                bckTitle = {bckInfo.bckTitle}
                bckDetail = {bckInfo.bckDetail}
                currentAmount = {bckInfo.currentAmount}
                targetAmount = {bckInfo.targetAmount}
                bckDepositList = {bckInfo.depositList}

            />
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