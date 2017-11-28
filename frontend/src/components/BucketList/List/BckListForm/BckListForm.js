import React from 'react';
import BckListContent from 'components/BucketList/List/BckListContent';
import CardBlock from 'components/common/Block/CardBlock';
import { progressColor } from 'lib/variables';

import 'semantic-ui-css/semantic.min.css';
import './BckListForm.css';

const BckListForm = ({
    BucketListListData,
    toggleMode,
    onShowBckDetailInfo,
    getCurrentMoney,
    onBckOpenModal
}) => {

    const BckLstList = BucketListListData.length === 0 ?
        <div><p>등록한 버킷리스트가 없습니다.</p></div>
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
                toggleMode={toggleMode}
                onShowBckDetailInfo={onShowBckDetailInfo}
                progressColor={progressColor[Math.floor(progressColor.length % data.bckIdx)]} // randomColorProcess
                onDepositClick={()=>{onBckOpenModal('deposit',data.bckIdx)}}
                onDeleteClick={()=>{onBckOpenModal('delete',data.bckIdx)}}
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