import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as bckDetailActions from 'store/modules/bckDetail';
import BckDetailForm from 'components/BucketList/Detail/BckDetailForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import BeatLoading from 'components/common/Loading/BeatLoading';
import { getRemainDate, comma, getTodayForYYYYMMDD } from 'lib/util';

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
    
   loadBckDetailInfo = async () => {
       const { bckIdx } = this.props.match.params;
       const { bckDetailActions } = this.props;
       try{
           await bckDetailActions.loadBckDetailInfo(bckIdx);
       }catch(e){
           await alert(this.props.notifyMessage);
           await  this.props.history.push('/bck');
       }
   };

   handleModify = () => {
       const { bckIdx } = this.props.match.params;
       this.props.history.push('/bck/modify/'+bckIdx);
   };

  render() {
   const { bckDetailInfo, bckDetailLoading } = this.props;
   const { handleModify } = this;
   const remainDate = getRemainDate(getTodayForYYYYMMDD(), bckDetailInfo.completeDate);

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
                remainDate={remainDate > 0 ? remainDate : 0}
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
        bckDetailInfo: state.bckDetail.get('bckDetailInfo').toJS(),
        notifyMessage : state.bckDetail.get('notifyMessage')
    }),
    (dispatch) => ({
        bckDetailActions: bindActionCreators(bckDetailActions, dispatch),
    })
)(BckDetailContainer);