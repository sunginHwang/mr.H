import React from 'react';
import { Progress } from 'semantic-ui-react';
import './BckListContent.css';
import ContentList from 'components/common/ContentList';
import InfoLabel from 'components/common/Label/InfoLabel';
import PropertyCard from 'components/Property/List/PropertyCard';

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

    return(
        <div onClick={(e)=>{onShowBckDetailInfo(bckIdx)}}>
            <PropertyCard
                headerLeftValue={bckTitle}
                headerRightValue={<InfoLabel value={'D-'+getRemainDate(getTodayForYYYYMMDD(), completeDate)}
                                             color='deep-pink'/>}
                contentValue={<span style={{color: '#ababab',fontSize: '13px'}}>{bckTitle}...</span>}

                sideValue={<div style={{marginBottom:'-1.0em'}} >
                    <Progress percent={progressPercent.toFixed(2)}
                              size='small'
                              onClick={(e)=>{onShowBckDetailInfo(bckIdx)}}
                              progress='percent'
                              color={progressColor}/>
                </div>}
            />
        </div>


    );
};
export default BckListContent;