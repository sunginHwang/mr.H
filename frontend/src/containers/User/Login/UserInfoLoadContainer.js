import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'lib/constants';
import * as authActions from 'store/modules/auth';
import { saveTokenInfo, deleteTokenInfo } from 'lib/util';

class UserInfoLoadContainer extends Component {

    checkUserInfo = async () => {
        const { authActions } = this.props;
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        if(accessToken) {
            try {
                await authActions.loadUserInfo(accessToken, refreshToken);
                await saveTokenInfo(this.props.accessToken, this.props.refreshToken);
                await accessToken != this.props.accessToken && location.reload(true);
            } catch (e) {
                deleteTokenInfo();
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
        accessToken: state.auth.get('accessToken'),
        refreshToken: state.auth.get('refreshToken')
    }),
    (dispatch) => ({
        authActions: bindActionCreators(authActions, dispatch),
    })
)(UserInfoLoadContainer);