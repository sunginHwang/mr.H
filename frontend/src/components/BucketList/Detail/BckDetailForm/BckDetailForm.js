import React from 'react';
import BckDepositInfo from 'components/BucketList/Detail/BckDepositInfo';

const BckDetailForm = ({
    bckIdx,
    bckTitle,
    bckDetail,
    currentAmount,
    targetAmount,
    bckDepositList
}) => {

  return (
    <div>
      <div><span>BckIdx : </span><span>{bckIdx}</span></div>
      <div><span>targetAmount : </span><span>{targetAmount}</span></div>
      <div><span>currentAmount : </span><span>{currentAmount}</span></div>
      <div><span>bckTitle : </span><span>{bckTitle}</span></div>
      <div><span>bckDetail : </span><span>{bckDetail}</span></div>
      <br/><br/><br/><br/>
      <BckDepositInfo
          depositList = {bckDepositList}
      />
    </div>
  );
};
 
export default BckDetailForm;