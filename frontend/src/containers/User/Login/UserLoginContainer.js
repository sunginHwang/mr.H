import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import WithError from 'hoc/WithError';
import * as authActions from 'store/modules/auth';
import TitleHeader from 'components/common/Header/TitleHeader';
import LoginForm from 'components/User/Login/LoginForm';
import { LoginUserSampleData } from 'lib/variables';
import { ACCESS_TOKEN } from 'lib/constants';
import { saveTokenInfo, deleteTokenInfo } from 'lib/util';

class UserLoginContainer extends Component {

    componentDidMount() {
        const { userIdx, history, authActions } = this.props;

        if(userIdx !== -1 || localStorage.getItem(ACCESS_TOKEN)){
            alert('로그인 상태에서 접근할 수 없습니다.');
            history.push('/');
        }else{
            deleteTokenInfo();
            authActions.initialAuthUser();
        }
    };

   handleChangeLoginInputValue = (type, e) =>{
        const {authActions} = this.props;
        const { value } = e.target;
        const inputParam = {inputType : type, value : value};
        authActions.changeLoginInputValue(inputParam);
   };

   handleLogin = async () => {
       const { loginValidate } = this;
       const { authActions, withSetErrorMessage,userId , userPassword } = this.props;
       if(loginValidate()){
          try{
              await authActions.userLogin(userId, userPassword);
              await saveTokenInfo(this.props.accessToken, this.props.refreshToken);
              await this.props.history.push('/');
          }catch(e){
              await withSetErrorMessage(this.props.notifyMessage);
          }
      }
   };

   loginValidate = () => {
       const { userId, userPassword, withSetErrorMessage } = this.props;
       if(userId.length < 1 ){
           withSetErrorMessage('아이디를 입력해주세요.');
           return false;
       }

       if(userPassword.length < 1 ){
           withSetErrorMessage('비밀번호를 입력해주세요.');
           return false;
       }

       return true;
   };

  render() {
     const { handleChangeLoginInputValue, handleLogin } = this;
     const { userId, userPassword } = this.props;

    return (
      <div>
          <TitleHeader
              iconColor='white'
              iconSize='large'
              titleName='로그인'
          />
          <LoginForm
              userId={userId}
              userPassword={userPassword}
              onInputChange={handleChangeLoginInputValue}
              onLoginClick={handleLogin}
            />
      </div>
    );
  }
}
export default WithError(connect(
    (state) => ({
        userIdx: state.auth.getIn(['user','userIdx']),
        userId: state.auth.getIn(['user','userId']),
        userPassword: state.auth.getIn(['user','userPassword']),
        accessToken: state.auth.get('accessToken'),
        refreshToken: state.auth.get('refreshToken'),
        notifyMessage: state.auth.get('notifyMessage')
    }),
    (dispatch) => ({
        authActions: bindActionCreators(authActions, dispatch),
    })
)(UserLoginContainer));