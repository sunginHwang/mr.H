import React from 'react';
import BckListContent from 'components/BucketList/List/BckListContent';
import { progressColor } from 'lib/variables';

import 'semantic-ui-css/semantic.min.css';
import './BckListForm.css';

const BckListForm = ({
    BucketListListData,
    onShowBckDetailInfo,
    onBckOpenModal
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
                onShowBckDetailInfo ={onShowBckDetailInfo}
                progressColor={progressColor[Math.floor(progressColor.length % data.bckIdx)]} // randomColorProcess
                onDepositClick={()=>{onBckOpenModal('deposit',data.bckIdx)}}
                onDeleteClick={()=>{onBckOpenModal('delete',data.bckIdx)}}
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