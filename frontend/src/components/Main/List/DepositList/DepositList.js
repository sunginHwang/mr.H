import React from 'react';
import { Progress } from 'semantic-ui-react';
import ContentList from 'components/common/ContentList';

import 'semantic-ui-css/semantic.min.css';
import './DepositList.css';

const DepositListTitle = ({title, onTitleClick}) => {
    return(<p onClick={onTitleClick}>{title}</p>);
};

const DepositList = ({
    propertyIdx,
    depositTitle,
    startDate,
    completeDate,
    currentAmount,
    targetAmount,
    progressColor
}) => {
  return (
    <div>
        <ContentList
            left_title={
                <DepositListTitle title={depositTitle}
                                  onTitleClick={(e)=>{console.log(222);}}
                />}
            right_title={currentAmount}
        >
            <Progress percent={30}
                      onClick={(event)=>{DepositListTitle}}
                      progress='percent'
                      color={progressColor}/>
        </ContentList>
    </div>
  );
};

export default DepositList;