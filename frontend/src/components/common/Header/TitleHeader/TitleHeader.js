import React from 'react';
import { Icon } from 'semantic-ui-react';

import './TitleHeader.css';

const TitleHeader = ({
    iconSize,
    iconColor,
    titleName
}) => {
  return (
        <header className="title-header">
            <nav>
                <div className="title-left">
                    <a href='javascript:history.back();'>
                        <Icon name='chevron left'
                              size={iconSize}
                              color={iconColor}  />
                    </a>
                </div>
                <span className="title-header-center-name">{titleName}</span>
                <div className="title-right">
                </div>
            </nav>
        </header>
  );
};

export default TitleHeader;