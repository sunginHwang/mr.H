import React from 'react';
import InputLabel from 'components/common/Input/InputLabel';
import LoginNavArea from 'components/User/Login/LoginNavArea';
import './LoginForm.css';

const LoginForm = ({
  userId,
  userPassword,
  onInputChange,
    onLoginClick
}) => {
  return (
    <div className='login-wrapper'>
      <div className='login-input-area'>
        <InputLabel
            labelName='아이디'
            placeHolderName='아이디를 입력해주세요'
            inputValue={userId}
            inputType='text'
            onInputChange={(e)=>{onInputChange('userId',e)}}
        />
        <InputLabel
            labelName='비밀번호'
            placeHolderName='비밀번호를 입력해주세요.'
            inputValue={userPassword}
            inputType='password'
            onInputChange={(e)=>{onInputChange('userPassword',e)}}
        />
      </div>
      <LoginNavArea/>
      <button className='login-button' onClick={onLoginClick}>로그인 하기</button>
    </div>
  );
};
 
export default LoginForm;