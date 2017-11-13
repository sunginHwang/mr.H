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
        if(userIdx !== -1){
            alert('로그인 상태에서 접근할 수 없습니다.');
            history.push('/');
        }else{
            authActions.initialAuthUser();
        }
    }

   handleChangeLoginInputValue = (type, e) =>{
        const {authActions} = this.props;
        const { value } = e.target;
        const inputParam = {inputType : type, value : value};
       authActions.changeLoginInputValue(inputParam);
   }

   handleLogin = async () => {
       const { loginValidate } = this;
       const { authActions, setErrorMessage } = this.props;
       if(loginValidate()){
          try{
              await authActions.userLogin(LoginUserSampleData);
              await this.props.history.push('/');
          }catch(e){
              await setErrorMessage('로그인 실패');
          }
      }
   }

   loginValidate = () => {
       const { userId, userPassword, setErrorMessage } = this.props;
       if(userId.length < 1 ){
           setErrorMessage('아이디를 입력해주세요.');
           return false;
       }

       if(userPassword.length < 1 ){
           setErrorMessage('비밀번호를 입력해주세요.');
           return false;
       }

       return true;
   }

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
        validateErrMessage: state.auth.getIn(['error','validateErrMessage']),
        saveErrMessage: state.auth.getIn(['error','saveErrMessage'])
    }),
    (dispatch) => ({
        authActions: bindActionCreators(authActions, dispatch),
    })
)(UserLoginContainer));