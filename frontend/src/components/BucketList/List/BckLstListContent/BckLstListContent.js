import React from 'react';
import {Link} from 'react-router-dom';
import { Progress } from 'semantic-ui-react';
import ContentList from 'components/common/ContentList';
import BckLstListEventButton from 'components/BucketList/List/BckLstListEventButton';
import BckLstListTitle from 'components/BucketList/List/BckLstListTitle';

import 'semantic-ui-css/semantic.min.css';

const BckLstListContent = ({
    bucketListTitle,
    completeDate,
    currentAmount,
    targetAmount,
    bckIdx,
    onDepositClick,
    onDeleteClick
}) => {

    return(
        <ContentList
            left_title={
                <BckLstListTitle title={bucketListTitle}
                                 completeDate={completeDate}
                />}
            right_title={
                <BckLstListEventButton bckIdx = {bckIdx}
                                       onDepositClick={onDepositClick}
                                       onDeleteClick={onDeleteClick}
                />
            }
        >
            <Progress percent={(currentAmount/targetAmount)*100}
                      progress='percent'
                      color='teal'/>
        </ContentList>
    );
};
export default BckLstListContent;