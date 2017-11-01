import React from 'react';
import BckDepositInfo from 'components/BucketList/Detail/BckDepositInfo';
import BckDateInfo from 'components/BucketList/Detail/BckDateInfo';
import BckMoneyInfo from 'components/BucketList/Detail/BckMoneyInfo';
import CardBlock from 'components/common/Block/CardBlock';
import BottomButton from 'components/common/Button/BottomButton';
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
    bckDepositList,
    onModifyClick,
    comma
}) => {
    return (
        <div className='bck-detail-form'>
          <BckMoneyInfo
              bckTitle={bckTitle}
              targetAmount={targetAmount}
              currentAmount={currentAmount}
              comma={comma}
          />
          <BckDateInfo
            bckTitle={bckTitle}
            regiDate={regiDate}
            completeDate={completeDate}
            remainDate={remainDate}
          />
          <CardBlock
              headerTitle={bckTitle + ' 상세 내용'}
              headerSubArea=''>
            <span>{bckDetail}</span>
          </CardBlock>
          <BckDepositInfo
              depositList={bckDepositList}
              comma={comma}
          />
          <BottomButton
                bottomButtonName='수정하기'
                onButtonClick={onModifyClick}
                color='whiteBlue'
          />
        </div>
  );
};
 
export default BckDetailForm;