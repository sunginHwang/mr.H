import React from 'react';
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './MainHeader.css';

const MainHeader = ({
    onSideMenuClick
}) => {
  return (
    <header className='main-header'>
        <nav>
            <div className='header-left'>
                <Link className='header-left-title' to='/'>
                <h3><Icon name='currency'/> mr. H</h3>
                </Link>
            </div>
            <span className='flex-auto'></span>
            <div className='header-right' onClick={onSideMenuClick}>
                <Icon name='list layout' size='big'/>
            </div>
        </nav>
    </header>
  );
};

export default MainHeader;