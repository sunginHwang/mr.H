import React from 'react';
import './sideMenu.css';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'

const SideMenu = ({
    menuVisible,
    onSideMenuClick,
    userName,
    userIdx,
    onLogout
}) => {

  const isLogin = userIdx !== -1 ? true : false;

  return (
    <div className={ menuVisible ? ' side-menu-on side-menu' : 'dark-colors side-menu'}>
        <button onClick={onSideMenuClick} className='side-close-btn'>
            <Icon name='close' size='large'/>
        </button>

        <ul className='side-menu-wrapper'>
            {isLogin ?
                <li className='side-menu-item' onClick={onSideMenuClick}>
                    <div className='item-menu-link' >
                        <Icon name='user circle'/>
                        <span>{userName}</span>
                        <Icon style={{float:'right'}} name='angle right'/>
                        <span style={{float:'right'}} onClick={onLogout}>로그아웃</span>
                    </div>
                </li> :
                <li className='side-menu-item' onClick={onSideMenuClick}>
                    <Link className='item-menu-link' to='/login'>
                        <Icon name='user circle'/>
                        <span>로그인</span>
                        <Icon style={{float:'right'}} name='angle right'/>
                    </Link>
                </li>
            }
            {!isLogin &&
                <li className='side-menu-item' onClick={onSideMenuClick}>
                    <Link className='item-menu-link' to='/user/register'>
                        <Icon name='add user'/>
                        <span>회원가입</span>
                        <Icon style={{float:'right'}} name='angle right'/>
                    </Link>
                </li>
            }
            <li className='side-menu-item' onClick={onSideMenuClick}>
                <Link className='item-menu-link' to='/'>
                    <Icon name='sticky note'/>
                    <span>메인페이지</span>
                    <Icon style={{float:'right'}} name='angle right'/>
                </Link>
            </li>
            <li className='side-menu-item' onClick={onSideMenuClick}>
                <Link className='item-menu-link' to='/property'>
                    <Icon name='won'/>
                    <span>예금,적금</span>
                    <Icon style={{float:'right'}} name='angle right'/>
                </Link>
            </li>
            <li className='side-menu-item' onClick={onSideMenuClick}>
                <Link className='item-menu-link' to='/bck'>
                    <Icon name='gift'/>
                    <span>버킷리스트</span>
                    <Icon style={{float:'right'}} name='angle right'/>
                </Link>
            </li>
        </ul>
    </div>
  );
};

export default SideMenu;