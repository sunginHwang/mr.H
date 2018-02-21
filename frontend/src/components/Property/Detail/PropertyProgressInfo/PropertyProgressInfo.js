import React from 'react';
import { Progress } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './PropertyProgressInfo.css';

const PropertyProgressInfo = ({
    title,
    startDate,
    targetAmount,
    completeDate,
    passedDate
}) => {
  return (
    <div className='property-progress-wrapper'>
        <div>
            <p className='title'>{title}</p>
            <p className='total-amount'>{targetAmount+' 원'}</p>
            <p className='end-date'>{'만기일 : '+completeDate}</p>
        </div>

        <Progress className='property-progress'
                  active
                  percent={passedDate}
                  progress='percent'
                  size='medium'
                  color='grey'/>
        <div className='progress-bottom'>
            <span className='progress-bottom-txt'>{'시작일 : '+startDate}</span>
            <span className='progress-bottom-txt'>만기일</span>
        </div>
    </div>
  );
};

export default PropertyProgressInfo;