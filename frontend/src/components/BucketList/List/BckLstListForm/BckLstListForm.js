import React from 'react';
import {Link} from 'react-router-dom';
import { Progress } from 'semantic-ui-react';
import ContentList from 'components/common/ContentList';
import BckLstListEventButton from 'components/BucketList/List/BckLstListEventButton';
import BckLstListContent from 'components/BucketList/List/BckLstListContent';

import 'semantic-ui-css/semantic.min.css';


const BckLstListForm = ({BucketListListData}) => {

    const BckLstList = BucketListListData.map((data,i) =>
        (
            <BckLstListContent
                key={i}
                bucketListTitle={data.bucketListTitle}
                completeDate={data.completeDate}
                currentAmount={data.currentAmount}
                targetAmount={data.targetAmount}
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