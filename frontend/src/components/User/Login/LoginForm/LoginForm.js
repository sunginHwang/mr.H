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
            placeHolderName=' 아이디를 입력해주세요'
            inputValue={userId}
            inputType='text'
            onInputChange={(e)=>{onInputChange('userId',e)}}
        />
        <InputLabel
            placeHolderName=' 비밀번호를 입력해주세요.'
            inputValue={userPassword}
            inputType='password'
            onInputChange={(e)=>{onInputChange('userPassword',e)}}
        />
      </div>
        <button className='login-button' onClick={onLoginClick}>로그인</button>
        <LoginNavArea/>
    </div>
  )
};
 
export default LoginForm;