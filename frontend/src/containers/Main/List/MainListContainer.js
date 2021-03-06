import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mainListActions from 'store/modules/mainList';
import MainListForm from 'components/Main/List/MainListForm';
import NonUserView from 'components/Main/NonUserView';
import BeatLoading from 'components/common/Loading/BeatLoading';
import { filterBckListForCompleteType } from 'lib/bucketList';
import { comma, getRemainDatePercentage, isLogin } from 'lib/util';
import { getDepositTotalMoney } from 'lib/deposit';



class MainListContainer extends Component {

    componentDidMount(){
        this.loadMainInfo();
    };
    /*메인 정보 리스트 불러오기*/
    loadMainInfo(){
        this.props.mainListActions.loadMainListInfo();
    }

    /*입금 종류에 따른 현재금액 구하기*/
    getCurrentLowAmount(CurrentLowAmountList,type){
        const LowAmount = CurrentLowAmountList.find( (LowAmount) => LowAmount.typeIdx == type);
        return LowAmount == undefined ? 0
                                      : comma(LowAmount.totalMoney);
    };

    render() {
        const { propertyMoneyList, propertyList, bckList, currentLowAmount, userIdx, mainListLoading} = this.props;
        const { getCurrentLowAmount } = this;

        /*first loading view*/
        if(mainListLoading) return <BeatLoading loading={mainListLoading}/>;
        /*not login Main view*/
        if(!isLogin(userIdx)){
            return <NonUserView/>;
        }

        return (
            <div>
                <MainListForm
                    propertyMoneyList={propertyMoneyList}
                    propertyList={propertyList}
                    bckList={bckList}
                    currentLowAmount={currentLowAmount}
                    filterBckListForCompleteType={filterBckListForCompleteType}
                    getRemainDatePercentage={getRemainDatePercentage}
                    getDepositTotalMoney={getDepositTotalMoney}
                    getCurrentLowAmount={getCurrentLowAmount}
                    comma={comma}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        mainListLoading: state.pender.pending['mainList/LOAD_MAIN_LIST_INFO'],
        userIdx: state.auth.getIn(['user','userIdx']),
        propertyMoneyList: state.mainList.get('propertyMoneyList').toJS(),
        propertyList: state.mainList.get('propertyList').toJS(),
        bckList: state.mainList.get('bckList').toJS(),
        currentLowAmount: state.mainList.get('currentLowAmount').toJS()
    }),
    (dispatch) => ({
        mainListActions: bindActionCreators(mainListActions, dispatch),
    })
)(MainListContainer);
