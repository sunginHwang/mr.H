import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mainHeaderActions from 'store/modules/mainHeader';
import * as authActions from 'store/modules/auth';
import MainHeader from 'components/common/Header/MainHeader';
import SideMenu from 'components/Main/SideMenu';

class MainHeaderContainer extends Component {

   handleLogout = async () => {
        const { authActions, history } = this.props;
        await authActions.initialAuthUser();
        await alert('로그아웃 성공');
        await history.push('/login');
   }

   handleSideMenuClick = () => {
       const { mainHeaderActions } = this.props;
       mainHeaderActions.toggleSideMenu();
   }

  render() {
    const { sideMenuVisible, userName, userIdx } = this.props;
    const { handleLogout, handleSideMenuClick } = this;

    return (
        <div>
          <MainHeader
            onSideMenuClick={handleSideMenuClick}
          />
          <SideMenu
            menuVisible={sideMenuVisible}
            userName={userName}
            userIdx={userIdx}
            onSideMenuClick={handleSideMenuClick}
            onLogout={handleLogout}
          />
        </div>
    );
  }
}


export default connect(
    (state) => ({
        userIdx: state.auth.getIn(['user','userIdx']),
        userName: state.auth.getIn(['user','userName']),
        sideMenuVisible: state.mainHeader.get('sideMenuVisible')
    }),
    (dispatch) => ({
        mainHeaderActions: bindActionCreators(mainHeaderActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch),
    })
)(MainHeaderContainer);
