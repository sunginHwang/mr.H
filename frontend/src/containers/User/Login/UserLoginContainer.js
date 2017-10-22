import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'store/modules/user';
import TitleHeader from 'components/common/Header/TitleHeader';
import LoginForm from 'components/User/Login/LoginForm';
import ErrorBlock from 'components/common/Block/ErrorBlock';
import { LoginUserSampleData } from 'lib/variables';

class UserLoginContainer extends Component {

    componentDidMount() {
        if(this.props.userIdx !== -1){
            alert('로그인 상태에서 접근할 수 없습니다.');
            this.props.history.push('/');
        }
    }

   handleChangeLoginInputValue = (type, e) =>{
        const {userActions} = this.props;
        const { value } = e.target;
        const inputParam = {inputType : type, value : value};
       userActions.changeLoginInputValue(inputParam);
   }

   handleLogin = async () => {
       const { handleLoginValidate, handleSetErrorMsg } = this;
       const { userActions, saveErrMessage } = this.props;
      if(handleLoginValidate()){
          try{
              await userActions.userLogin(LoginUserSampleData);
              await this.props.history.push('/');
          }catch(e){
              await handleSetErrorMsg(saveErrMessage);
          }
      }
   }

   handleLoginValidate = () => {
       const { userId, userPassword } = this.props;
       const { handleSetErrorMsg } = this;
       if(userId.length < 1 ){
           handleSetErrorMsg('아이디를 입력해주세요.');
           return false;
       }

       if(userPassword.length < 1 ){
           handleSetErrorMsg('비밀번호를 입력해주세요.');
           return false;
       }

       return true;
   }

    // 공통점 빼야 할 부분 
    handleSetErrorMsg = (ErrMsg) => {
        const { userActions } = this.props;
        const timer = 800;
        userActions.setValidateErrorMessage(ErrMsg);
        setTimeout(() => userActions.setValidateErrorMessage(''), timer);
    }

  render() {
     const { handleChangeLoginInputValue, handleLogin } = this;
     const { userId, userPassword, validateErrMessage } = this.props;

    return (
      <div>
          <TitleHeader
              iconColor='black'
              iconSize='large'
              titleName='로그인'
          />
          {validateErrMessage !== '' &&
          <ErrorBlock
              errorMessage={validateErrMessage}
              positon='top'/>
          }
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
export default connect(
    (state) => ({
        userIdx: state.user.get('userIdx'),
        userId: state.user.get('userId'),
        userPassword: state.user.get('userPassword'),
        validateErrMessage: state.user.getIn(['error','validateErrMessage']),
        saveErrMessage: state.user.getIn(['error','saveErrMessage'])
    }),
    (dispatch) => ({
        userActions: bindActionCreators(userActions, dispatch),
    })
)(UserLoginContainer);