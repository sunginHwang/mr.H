import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mainListActions from 'store/modules/mainList';
import MainListForm from 'components/Main/List/MainListForm';



class MainListContainer extends Component {


    render() {
        const { propertyMoneyList,
            propertyList
        } = this.props;

        const data = propertyMoneyList.toJS();
        return (
            <div>
                <MainListForm
                    propertyMoneyList={data}
                    propertyList={propertyList.toJS()}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        propertyMoneyList: state.mainList.get('propertyMoneyList'),
        propertyList: state.mainList.get('propertyList')
    }),
    (dispatch) => ({
        mainListActions: bindActionCreators(mainListActions, dispatch),
    })
)(MainListContainer);
