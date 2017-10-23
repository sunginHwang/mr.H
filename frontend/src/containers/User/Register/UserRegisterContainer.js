import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'store/modules/user';
import UserRegisterForm from 'components/User/Register/UserRegisterForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import ErrorBlock from 'components/common/Block/ErrorBlock';
import { checkEmailReg } from 'lib/util';

class UserRegisterContainer extends Component {

    componentDidMount() {
      const { userIdx, history } = this.props;
        if(userIdx !== -1){
            alert('로그인 상태에서 접근할 수 없습니다.');
            history.push('/');
        }
    }

    componentWillUnmount(){
        this.props.userActions.initialUserInfo();
    }

    handleChangeUserInputValue = (type, e) =>{
        const {userActions} = this.props;
        const { value } = e.target;
        const inputParam = {inputType : type, value : value};
        userActions.changeUserInputValue(inputParam);
    }

    handleUserRegister = async () =>{
      const { registerValidate } = this;

      const isValidate = await registerValidate();

      if(isValidate){
          console.log('success reigster');
          alert('회원가입에 성공하였습니다. 로그인해주세요.');
          this.props.history.push('/login');
      }
    }

    setErrorMsg = (ErrMsg) => {
        const { userActions } = this.props;
        const timer = 800;
        userActions.setValidateErrorMessage(ErrMsg);
        setTimeout(() => userActions.setValidateErrorMessage(''), timer);
    }

    registerValidate = () => {
        const { userId, userPassword, userPasswordCheck, userName, userEmail } = this.props;
        const { setErrorMsg, checkDuplicateUserId } = this;

        if(userId.length <= 2 || userId.length >= 10){
            setErrorMsg('아이디는 2~10글자 사이로 입력해주세요.');
            return false;
        }

        if(userPassword.length <= 4 || userPassword.length >= 12){
            setErrorMsg('비밀번호는 4~12글자 사이로 입력해주세요.');
            return false;
        }

        if(userPassword !== userPasswordCheck){
            setErrorMsg('각 비밀번호가 일치하지 않습니다.');
            return false;
        }

        if(userName.length < 1){
            setErrorMsg('이름을 입력해주세요.');
            return false;
        }

        if(userEmail.length < 1){
            setErrorMsg('이메일을 입력해주세요.');
            return false;
        }

        if(!checkEmailReg(userEmail)){
            setErrorMsg('이메일 형식을 확인해주세요.');
            return false;
        }

        if(!checkDuplicateUserId(userEmail)){
            setErrorMsg('이미 해당 아이디가 존재합니다.');
            return false;
        }


        return true;
    }

    checkDuplicateUserId = (userId) => {
      /*something asnyc working*/
      return true;
    }

  render() {
    const {
       userId,
       userPassword,
       userPasswordCheck,
       userName,
       userEmail,
       validateErrMessage
    } = this.props;

    const { handleChangeUserInputValue, handleUserRegister } = this;

    return (
      <div>
        <TitleHeader
            iconColor='black'
            iconSize='large'
            titleName='회원가입'
        />
        {validateErrMessage !== '' &&
        <ErrorBlock
            errorMessage={validateErrMessage}
            positon='top'/>
        }
        <UserRegisterForm
          userId={userId}
          userPassword={userPassword}
          userPasswordCheck={userPasswordCheck}
          userName={userName}
          userEmail={userEmail}
          onInputChange={handleChangeUserInputValue}
          onRegister={handleUserRegister}
        />
      </div>
    );
  }
}
export default connect(
    (state) => ({
        userIdx:  state.auth.getIn(['user','userIdx']),
        userId:  state.user.get('userId'),
        userPassword: state.user.get('userPassword'),
        userPasswordCheck: state.user.get('userPasswordCheck'),
        userName: state.user.get('userName'),
        userEmail: state.user.get('userEmail'),
        validateErrMessage: state.user.getIn(['error','validateErrMessage']),
        saveErrMessage: state.user.getIn(['error','saveErrMessage'])
    }),
    (dispatch) => ({
        userActions: bindActionCreators(userActions, dispatch),
    })
)(UserRegisterContainer);