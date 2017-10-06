import React from 'react';
import { Icon } from 'semantic-ui-react'
import './MainHeader.css';

const MainHeader = () => {
  return (
    <header className="main-header">
        <nav>
            <div className="header-left">
                <h3><Icon name='currency'/> mr. H</h3>
            </div>
            <span className="flex-auto"></span>
            <div className="header-right">
                <Icon name='list layout' size='big'/>
            </div>
        </nav>
    </header>
  );
};

export default MainHeader;