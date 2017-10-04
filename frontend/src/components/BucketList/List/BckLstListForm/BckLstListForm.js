import React from 'react';
import {Link} from 'react-router-dom';
import { Progress } from 'semantic-ui-react';
import BckLstListContent from 'components/BucketList/List/BckLstListContent';
import 'semantic-ui-css/semantic.min.css';

const BckLstListForm = ({
    BucketListListData,
    handleBckOpenModal
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
                onDepositClick={()=>{handleBckOpenModal('deposit',data.bckIdx)}}
                onDeleteClick={()=>{handleBckOpenModal('delete',data.bckIdx)}}
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