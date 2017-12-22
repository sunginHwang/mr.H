import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'store/modules/auth';

class UserInfoLoadContainer extends Component {

    checkUserInfo = async () => {
        const { authActions } = this.props;
        const accessToken = localStorage.getItem('_MRH_USER_');

        if(accessToken) {
            try {
                await authActions.loadUserInfo(accessToken);
            } catch (e) {
                localStorage.removeItem('_MRH_USER_');
            }
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const isDiffUser = !prevProps.userIdx && this.props.userIdx;
        isDiffUser && this.checkUserInfo();
    }

    componentDidMount() {
        this.checkUserInfo();
    }

    render() {
        return null;
    }

}
export default connect(
    (state) => ({
        accessToken: state.auth.get('accessToken')
    }),
    (dispatch) => ({
        authActions: bindActionCreators(authActions, dispatch),
    })
)(UserInfoLoadContainer);