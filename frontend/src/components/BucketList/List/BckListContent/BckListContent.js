import React from 'react';
import { Progress } from 'semantic-ui-react';
import './BckListContent.css';
import ContentList from 'components/common/ContentList';
import InfoLabel from 'components/common/Label/InfoLabel';

import 'semantic-ui-css/semantic.min.css';

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
    const bckCardListStyle = {
        padding : '1em',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '2px 3px rgba(0, 0, 0, .1)',
        marginBottom: '0.7em'
    };

    return(
        <ContentList
            style={bckCardListStyle}
            left_title={
                <BckListTitle title={bckTitle}
                              onTitleClick={(e)=>{onShowBckDetailInfo(bckIdx)}}
                />
            }
            right_title={
                <InfoLabel value={'D-'+getRemainDate(getTodayForYYYYMMDD(), completeDate)}
                           color='deep-pink'
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