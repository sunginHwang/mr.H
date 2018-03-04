import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckDetailActions from 'store/modules/bckDetail';
import BckDetailForm from 'components/BucketList/Detail/BckDetailForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import BeatLoading from 'components/common/Loading/BeatLoading';
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
   };
    
   loadBckDetailInfo = () => {
       const { bckIdx } = this.props.match.params;
       const { bckDetailActions } = this.props;
       bckDetailActions.loadBckDetailInfo(bckIdx);
   };

   handleModify = () => {
       const { bckIdx } = this.props.match.params;
       this.props.history.push('/bck/modify/'+bckIdx);
   };

  render() {
   const { bckDetailInfo, bckDetailLoading } = this.props;
   const { handleModify } = this;
   const remainDate = getRemainDate(bckDetailInfo.startDate, bckDetailInfo.completeDate);

  if(bckDetailLoading) return <BeatLoading loading={bckDetailLoading}/>;


      return (
        <div>
            <TitleHeader
                iconColor='black'
                iconSize='large'
                titleName={bckDetailInfo.bckTitle}
            />
            <BckDetailForm
                bckInfo={bckDetailInfo}
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
        bckDetailLoading: state.pender.pending['bckDetail/LOAD_BCK_DETAIL_INFO'],
        bckDetailInfo: state.bckDetail.get('bckDetailInfo').toJS()
    }),
    (dispatch) => ({
        bckDetailActions: bindActionCreators(bckDetailActions, dispatch),
    })
)(BckDetailContainer);