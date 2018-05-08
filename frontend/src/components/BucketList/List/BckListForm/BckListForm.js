import React from 'react';
import BckListContent from 'components/BucketList/List/BckListContent';
import { progressColor } from 'lib/variables';

import 'semantic-ui-css/semantic.min.css';
import './BckListForm.css';

const BckListForm = ({
    BucketListListData,
    onShowBckDetailInfo,
    getCurrentMoney,
}) => {

    const BckLstList = BucketListListData.length === 0 ?
        <div className='non-bck-list'><p>등록한 버킷리스트가 없습니다.</p></div>
        :
        BucketListListData.map((data) =>
        (
            <BckListContent
                key={data.bckIdx}
                bckIdx={data.bckIdx}
                bckTitle={data.bckTitle}
                startDate={data.startDate}
                completeDate={data.completeDate}
                completeType={data.typeIdx}
                currentAmount={getCurrentMoney(data.depositLists)}
                targetAmount={data.targetAmount}
                onShowBckDetailInfo={onShowBckDetailInfo}
                progressColor='teal'
            />
        )
    );

    return(
        <div className='bck-list-form'>
                {BckLstList}
        </div>
    );
};
export default BckListForm;