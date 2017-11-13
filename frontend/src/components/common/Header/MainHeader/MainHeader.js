import React from 'react';
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './MainHeader.css';

const MainHeader = ({
    onSideMenuClick
}) => {
  return (
    <header className='MainHeader'>
        <nav>
            <div className='MainHeader-left'>
                <Link className='MainHeader-left-title' to='/'>
                <h3><Icon name='currency'/> mr. H</h3>
                </Link>
            </div>
            <span className='flex-auto'></span>
            <div className='MainHeader-right' onClick={onSideMenuClick}>
                <Icon name='list layout' size='big'/>
            </div>
        </nav>
    </header>
  );
};

export default MainHeader;