import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckDetailActions from 'store/modules/bckDetail';
import BckDetailForm from 'components/BucketList/Detail/BckDetailForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import { InitinalBckDetailData } from 'lib/variables';
import { getRemainDate, comma } from 'lib/util';

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
   const remainDate = getRemainDate(bckDetailInfo.get('startDate'), bckDetailInfo.get('completeDate'));

    return (
        <div>
            <TitleHeader
                iconColor='black'
                iconSize='large'
                titleName={bckDetailInfo.get('bckTitle')}
            />
            <BckDetailForm
                bckInfo={bckDetailInfo.toJS()}
                remainDate={remainDate}
                onModifyClick={handleModify}
                comma={comma}
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