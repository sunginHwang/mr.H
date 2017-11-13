import React from 'react';
import { Icon } from 'semantic-ui-react';
import './TitleHeader.css';

const TitleHeader = ({
    iconSize,
    iconColor,
    titleName
}) => {
  return (
        <header className='TitleHeader'>
            <nav>
                <div className='TitleHeader-left'>
                    <a href='javascript:history.back();'>
                        <Icon name='chevron left'
                              size={iconSize}
                              color={iconColor}  />
                    </a>
                </div>
                <span className='TitleHeader-center-name'>{titleName}</span>
                <div className='TitleHeader-right'>
                </div>
            </nav>
        </header>
  );
};

export default TitleHeader;