import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import WithError from 'hoc/WithError';
import * as userActions from 'store/modules/user';
import UserRegisterForm from 'components/User/Register/UserRegisterForm';
import TitleHeader from 'components/common/Header/TitleHeader';
import { checkEmailReg } from 'lib/util';

class UserRegisterContainer extends Component {

    componentDidMount() {
      const { userIdx, history } = this.props;
        if(userIdx !== -1){
            alert('로그아웃 후 회원가입이 가능합니다.');
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
        const { userId, userPassword,  userName, userEmail, userActions } = this.props;
        const isValidate = await registerValidate();

      if(isValidate){
          try {
              await userActions.registerUser(userId, userPassword,  userName, userEmail);
              await alert(this.props.notifyMessage);
              await this.props.history.push('/login');
          } catch (e){
              await this.props.withSetErrorMessage(this.props.notifyMessage);
          }
      }

    }


    registerValidate = () => {
        const { userId, userPassword, userPasswordCheck, userName, userEmail, withSetErrorMessage } = this.props;

        if(userId.length <= 2 || userId.length >= 10){
            withSetErrorMessage('아이디는 2~10글자 사이로 입력해주세요.');
            return false;
        }

        if(userPassword.length <= 4 || userPassword.length >= 12){
            withSetErrorMessage('비밀번호는 4~12글자 사이로 입력해주세요.');
            return false;
        }

        if(userPassword !== userPasswordCheck){
            withSetErrorMessage('각 비밀번호가 일치하지 않습니다.');
            return false;
        }

        if(userName.length < 1){
            withSetErrorMessage('이름을 입력해주세요.');
            return false;
        }

        if(userEmail.length < 1){
            withSetErrorMessage('이메일을 입력해주세요.');
            return false;
        }

        if(!checkEmailReg(userEmail)){
            withSetErrorMessage('이메일 형식을 확인해주세요.');
            return false;
        }


        return true;
    }


  render() {
    const {
       userId,
       userPassword,
       userPasswordCheck,
       userName,
       userEmail
    } = this.props;

    const { handleChangeUserInputValue, handleUserRegister } = this;

    return (
      <div>
        <TitleHeader
            iconColor='black'
            iconSize='large'
            titleName='회원가입'
        />
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
export default WithError(connect(
    (state) => ({
        userIdx:  state.auth.getIn(['user','userIdx']),
        userId:  state.user.get('userId'),
        userPassword: state.user.get('userPassword'),
        userPasswordCheck: state.user.get('userPasswordCheck'),
        userName: state.user.get('userName'),
        userEmail: state.user.get('userEmail'),
        notifyMessage : state.user.get('notifyMessage')
    }),
    (dispatch) => ({
        userActions: bindActionCreators(userActions, dispatch),
    })
)(UserRegisterContainer));