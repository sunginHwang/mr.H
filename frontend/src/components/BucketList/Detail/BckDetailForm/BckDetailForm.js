import React from 'react';
import BckDepositInfo from 'components/BucketList/Detail/BckDepositInfo';
import BckDateInfo from 'components/BucketList/Detail/BckDateInfo';
import CardBlock from 'components/common/Block/CardBlock';
import './BckDetailForm.css';
const BckDetailForm = ({
    bckIdx,
    bckTitle,
    bckDetail,
    currentAmount,
    targetAmount,
    regiDate,
    completeDate,
    remainDate,
    bckDepositList
}) => {

  return (
    <div className="bck-detail-form">
      <br/><br/>
      <BckDateInfo
        targetAmount = {targetAmount}
        currentAmount = {currentAmount}
        bckTitle = {bckTitle}
        regiDate = {regiDate}
        completeDate = {completeDate}
        remainDate = {remainDate}
      />
      <br/><br/>
      <CardBlock
          headerTitle = '버킷리스트 상세 내용'
          headerSubArea = ''>
        <span>{bckDetail}</span>
      </CardBlock>
      <br/><br/>
      <BckDepositInfo
          depositList = {bckDepositList}
      />
    </div>
  );
};
 
export default BckDetailForm;