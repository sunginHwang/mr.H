import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mainHeaderActions from 'store/modules/mainHeader';
import * as authActions from 'store/modules/auth';
import MainHeader from 'components/common/Header/MainHeader';
import SideMenu from 'components/Main/SideMenu';
import { deleteTokenInfo } from 'lib/util';

class MainHeaderContainer extends Component {

    /*로그아웃*/
   handleLogout = async () => {
        const { authActions, history } = this.props;
        await authActions.initialAuthUser();
        await deleteTokenInfo();
        await history.push('/login');
   };

   /*메뉴버튼 클릭*/
   handleSideMenuClick = () => {
       const { mainHeaderActions } = this.props;
       mainHeaderActions.toggleSideMenu();
   };

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
