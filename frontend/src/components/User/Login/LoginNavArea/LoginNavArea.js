import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'
import './LoginNavArea.css';

const LoginNavArea = () => {
  return (
    <div className='login-nav-area'>
      <span className='regist-user'>
        <Link to='user/register'>
          <Icon name='add user'/>회원가입 하기
        </Link>
      </span>
      <span className='split-tag'>|</span>
      <span className='find-pwd'>
        <Link to='user/findPassword'>
          <Icon name='find'/>비밀번호 찾기
        </Link>
      </span>
    </div>
  );
};
 
export default LoginNavArea;