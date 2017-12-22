import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import WithError from 'hoc/WithError';
import * as authActions from 'store/modules/auth';
import TitleHeader from 'components/common/Header/TitleHeader';
import LoginForm from 'components/User/Login/LoginForm';
import { LoginUserSampleData } from 'lib/variables';

class UserLoginContainer extends Component {

    componentDidMount() {
        const { userIdx, history, authActions } = this.props;

        if(userIdx !== -1 || localStorage.getItem('_MRH_USER_')){
            alert('로그인 상태에서 접근할 수 없습니다.');
            history.push('/');
        }else{
            localStorage.removeItem('_MRH_USER_');
            authActions.initialAuthUser();
        }
    }

    componentDidUpdate(prevProps, prevState) {
    }

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
              await alert('로그인 성공');
              await localStorage.setItem("_MRH_USER_", this.props.accessToken);
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
              iconColor='black'
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
        notifyMessage: state.auth.get('notifyMessage')
    }),
    (dispatch) => ({
        authActions: bindActionCreators(authActions, dispatch),
    })
)(UserLoginContainer));