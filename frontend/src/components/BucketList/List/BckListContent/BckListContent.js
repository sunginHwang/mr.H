import React from 'react';
import { Progress } from 'semantic-ui-react';
import './BckListContent.css';
import ContentList from 'components/common/ContentList';
import InfoLabel from 'components/common/Label/InfoLabel';
import BckListEventButton from 'components/BucketList/List/BckListEventButton';

import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react'

import { getRemainDatePercentage, getRemainDate, getTodayForYYYYMMDD } from 'lib/util';
import { MONEY_COMPLETE } from 'lib/constants';

const BckListTitle = ({
    title,
    onTitleClick
}) => {
    return(
        <div>
            <span className='bck-list-title' onClick={onTitleClick}>
               {title}
            </span>
        </div>

    )
};


const BckListContent = ({
    bckTitle,
    startDate,
    completeDate,
    completeType,
    currentAmount,
    targetAmount,
    bckIdx,
    onShowBckDetailInfo,
    progressColor,
}) => {

    const progressPercent = completeType === MONEY_COMPLETE ? (currentAmount/targetAmount)*100
                                                            : getRemainDatePercentage(startDate,completeDate);


    return(
        <ContentList
            left_title={
                <BckListTitle title={bckTitle}
                              onTitleClick={(event)=>{onShowBckDetailInfo(bckIdx)}}
                />
            }
            right_title={
                <InfoLabel value={'D-'+getRemainDate(getTodayForYYYYMMDD(), completeDate)}
                           color='deep-blue'
                />
            }
        >
            <Progress percent={progressPercent.toFixed(2)}
                      size='small'
                      onClick={(e)=>{onShowBckDetailInfo(bckIdx)}}
                      progress='percent'
                      color={progressColor}/>
        </ContentList>
    );
};
export default BckListContent;