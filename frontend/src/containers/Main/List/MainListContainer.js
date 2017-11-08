import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mainListActions from 'store/modules/mainList';
import MainListForm from 'components/Main/List/MainListForm';
import { filterBckListForCompleteType } from 'lib/bucketList';
import { getRemainDatePercentage } from 'lib/util';



class MainListContainer extends Component {


    render() {
        const { propertyMoneyList, propertyList, bucketList } = this.props;

        return (
            <div>
                <MainListForm
                    propertyMoneyList={propertyMoneyList.toJS()}
                    propertyList={propertyList.toJS()}
                    bucketList={bucketList.toJS()}
                    filterBckListForCompleteType={filterBckListForCompleteType}
                    getRemainDatePercentage={getRemainDatePercentage}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        propertyMoneyList: state.mainList.get('propertyMoneyList'),
        propertyList: state.mainList.get('propertyList'),
        bucketList: state.mainList.get('bucketList')
    }),
    (dispatch) => ({
        mainListActions: bindActionCreators(mainListActions, dispatch),
    })
)(MainListContainer);
