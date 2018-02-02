import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mainListActions from 'store/modules/mainList';
import MainListForm from 'components/Main/List/MainListForm';
import { filterBckListForCompleteType } from 'lib/bucketList';
import { getRemainDatePercentage } from 'lib/util';



class MainListContainer extends Component {

    componentDidMount(){
        this.props.mainListActions.loadMainListInfo();
    }

    render() {
        const { propertyMoneyList, propertyList, bckList, currentLowAmount } = this.props;

        return (
            <div>
                <MainListForm
                    propertyMoneyList={propertyMoneyList}
                    propertyList={propertyList}
                    bckList={bckList}
                    currentLowAmount={currentLowAmount}
                    filterBckListForCompleteType={filterBckListForCompleteType}
                    getRemainDatePercentage={getRemainDatePercentage}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        propertyMoneyList: state.mainList.get('propertyMoneyList').toJS(),
        propertyList: state.mainList.get('propertyList').toJS(),
        bckList: state.mainList.get('bckList').toJS(),
        currentLowAmount: state.mainList.get('currentLowAmount').toJS()
    }),
    (dispatch) => ({
        mainListActions: bindActionCreators(mainListActions, dispatch),
    })
)(MainListContainer);
