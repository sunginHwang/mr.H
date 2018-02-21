import React from 'react';
import { Progress } from 'semantic-ui-react';
import './BckListContent.css';
import ContentList from 'components/common/ContentList';
import BckListEventButton from 'components/BucketList/List/BckListEventButton';
import 'semantic-ui-css/semantic.min.css';
import { getRemainDatePercentage } from 'lib/util';
import { MONEY_COMPLETE } from 'lib/constants';

const BckListTitle = ({
    title,
    completeDate,
    onTitleClick
}) => {
    return(<p className='bck-list-title' onClick={onTitleClick}>{title} ({completeDate})</p>);
};

const BckListContent = ({
    bckTitle,
    startDate,
    completeDate,
    completeType,
    currentAmount,
    targetAmount,
    toggleMode,
    bckIdx,
    onShowBckDetailInfo,
    progressColor,
    onDepositClick,
    onDeleteClick
}) => {

    const progressPercent = completeType === MONEY_COMPLETE ? (currentAmount/targetAmount)*100
                                                            : getRemainDatePercentage(startDate,completeDate);


    return(
        <ContentList
            style={{borderBottom: '.1rem dashed #bdbdbd', marginTop: '0.65em'}}
            left_title={
                <BckListTitle title={bckTitle}
                              onTitleClick={(event)=>{onShowBckDetailInfo(bckIdx)}}
                              completeDate={completeDate}
                />
            }
            right_title={
                <BckListEventButton
                    bckIdx={bckIdx}
                    completeType={completeType}
                    toggleMode={toggleMode}
                    onDepositClick={onDepositClick}
                    onDeleteClick={onDeleteClick}
                />
            }
        >
            <Progress percent={progressPercent.toFixed(2)}
                      onClick={(e)=>{onShowBckDetailInfo(bckIdx)}}
                      progress='percent'
                      color={progressColor}/>
        </ContentList>
    );
};
export default BckListContent;