import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckDetailActions from 'store/modules/bckDetail';
import BckDetailForm from 'components/BucketList/Detail/BckDetailForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import { InitinalBckDetailData } from 'lib/variables';
import { getRemainDate } from 'lib/util';

class BckDetailContainer extends Component {

    componentDidMount(){
       this.checkBckDetailAccess();
       this.loadBckDetailInfo();
    }

   checkBckDetailAccess = () => {
      const { bckIdx } = this.props.match.params;
      if(!Number.isInteger(Number.parseInt(bckIdx,10))){
          alert('정상적인 접근이 아닙니다.');
          this.props.history.push('/bck');
      }
   }
    
   loadBckDetailInfo = () => {
       const { bckDetailActions } = this.props;
       bckDetailActions.loadBckDetailInfo(InitinalBckDetailData);
   }

   handleModify = () => {
       const { bckIdx } = this.props.match.params;
       this.props.history.push('/bck/modify/'+bckIdx);
   }

  render() {
   /* 서버 사이드 전환시 해당 url 매치 idx 사용할것
   const { bckIdx } = this.props.match.params;
   */
   const { bckDetailInfo } = this.props;
   const { handleModify } = this;
   const bckInfo = bckDetailInfo.toJS();
   const remainDate = getRemainDate(bckInfo.regiDate, bckInfo.completeDate);

    return (
        <div>
            <TitleHeader
                iconColor='black'
                iconSize='large'
                titleName={bckInfo.bckTitle}
            />
            <BckDetailForm
                bckIdx={bckInfo.bckIdx}
                bckTitle={bckInfo.bckTitle}
                bckDetail={bckInfo.bckDetail}
                currentAmount={bckInfo.currentAmount}
                targetAmount={bckInfo.targetAmount}
                regiDate={bckInfo.regiDate}
                remainDate={remainDate}
                completeDate={bckInfo.completeDate}
                bckDepositList={bckInfo.depositList}
                onModifyClick={handleModify}
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