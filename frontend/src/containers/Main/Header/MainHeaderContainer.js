import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mainHeaderActions from 'store/modules/mainHeader';
import * as userActions from 'store/modules/user';
import MainHeader from 'components/common/Header/MainHeader';
import SideMenu from 'components/Main/SideMenu';
class MainHeaderContainer extends Component {

   handleLogout = async () => {
        const { userActions } = this.props;
        await userActions.userLogout();
        await alert('로그아웃 성공');
        await this.props.history.push('/login');
   }

  render() {
    const { mainHeaderActions, sideMenuVisible, userName, userIdx } = this.props;
    const { handleLogout } = this;

    return (
        <div>
          <MainHeader
            onSideMenuClick={mainHeaderActions.toggleSideMenu}
          />
          <SideMenu
            menuVisible={sideMenuVisible}
            userName={userName}
            userIdx={userIdx}
            onSideMenuClick={mainHeaderActions.toggleSideMenu}
            onLogout={handleLogout}
          />
        </div>
    );
  }
}


export default connect(
    (state) => ({
        userIdx: state.user.get('userIdx'),
        userName: state.user.get('userName'),
        sideMenuVisible: state.mainHeader.get('sideMenuVisible')
    }),
    (dispatch) => ({
        mainHeaderActions: bindActionCreators(mainHeaderActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    })
)(MainHeaderContainer);
