import React from 'react';
import InputLabel from 'components/common/Input/InputLabel';
import BottomButton from 'components/common/Button/BottomButton';
import './UserRegisterForm.css';

const UserRegisterForm = ({
    userId,
    userPassword,
    userPasswordCheck,
    userName,
    userEmail,
    onInputChange,
    onRegister
}) => {
  return (
    <div>
        <div className='user-register-form'>
            <InputLabel
                labelName='* 아이디'
                placeHolderName='2~10글자 이내로 입력해주세요.'
                inputValue={userId}
                inputType='text'
                onInputChange={(e)=>{onInputChange('userId',e)}}
            />
            <InputLabel
                labelName=' * 비밀번호'
                placeHolderName='4~12글자 사이로 입력해주세요.'
                inputValue={userPassword}
                inputType='password'
                onInputChange={(e)=>{onInputChange('userPassword',e)}}
            />
            <InputLabel
                labelName='* 비밀번호 확인'
                placeHolderName='비밀번호를 한번 더 입력해주세요..'
                inputValue={userPasswordCheck}
                inputType='password'
                onInputChange={(e)=>{onInputChange('userPasswordCheck',e)}}
            />
            <InputLabel
                labelName='* 이름'
                placeHolderName='이름을 입력해주세요.'
                inputValue={userName}
                inputType='text'
                onInputChange={(e)=>{onInputChange('userName',e)}}
            />
            <InputLabel
                labelName='* 이메일'
                placeHolderName='이메일을 입력해주세요.'
                inputValue={userEmail}
                inputType='email'
                onInputChange={(e)=>{onInputChange('userEmail',e)}}
            />
        </div>
        <BottomButton
            bottomButtonName='회원가입하기'
            onButtonClick={onRegister}
            color='whiteBlue'
        />
    </div>
  );
};
 
export default UserRegisterForm;