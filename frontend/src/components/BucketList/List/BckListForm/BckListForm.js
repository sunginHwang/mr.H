import React from 'react';
import BckListContent from 'components/BucketList/List/BckListContent';
import {  progressColor } from 'lib/variables';

import 'semantic-ui-css/semantic.min.css';
import './BckListForm.css';

const BckListForm = ({
    BucketListListData,
    handleBckOpenModal
}) => {

    const BckLstList = BucketListListData.map((data) =>
        (
            <BckListContent
                key={data.bckIdx}
                bckIdx={data.bckIdx}
                bckTitle={data.bckTitle}
                completeDate={data.completeDate}
                currentAmount={data.currentAmount}
                targetAmount={data.targetAmount}
                progressColor={progressColor[Math.floor(progressColor.length % data.bckIdx)]}
                onDepositClick={()=>{handleBckOpenModal('deposit',data.bckIdx)}}
                onDeleteClick={()=>{handleBckOpenModal('delete',data.bckIdx)}}
            />
        )
    );

    return(
        <div className="bck-list-form">
            {BckLstList}
        </div>

    );
};
export default BckListForm;