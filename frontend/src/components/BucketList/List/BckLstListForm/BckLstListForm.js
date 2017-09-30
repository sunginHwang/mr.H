import React from 'react';
import {Link} from 'react-router-dom';
import { Progress } from 'semantic-ui-react';
import ContentList from 'components/common/ContentList';
import BckLstListEventButton from 'components/BucketList/List/BckLstListEventButton';
import BckLstListContent from 'components/BucketList/List/BckLstListContent';

import 'semantic-ui-css/semantic.min.css';


const BckLstListForm = ({
    BucketListListData,
    toggleBckDepositModal
}) => {

    const BckLstList = BucketListListData.map((data) =>
        (
            <BckLstListContent
                key={data.bckIdx}
                bckIdx={data.bckIdx}
                bucketListTitle={data.bucketListTitle}
                completeDate={data.completeDate}
                currentAmount={data.currentAmount}
                targetAmount={data.targetAmount}
                toggleBckDepositModal={toggleBckDepositModal}
            />
        )
    );

    return(
        <div>
            {BckLstList}
        </div>

    );
};
export default BckLstListForm;