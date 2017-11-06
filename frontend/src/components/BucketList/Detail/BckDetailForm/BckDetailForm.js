import React from 'react';
import BckDepositInfo from 'components/BucketList/Detail/BckDepositInfo';
import BckDateInfo from 'components/BucketList/Detail/BckDateInfo';
import BckMoneyInfo from 'components/BucketList/Detail/BckMoneyInfo';
import CardBlock from 'components/common/Block/CardBlock';
import BottomButton from 'components/common/Button/BottomButton';
import { MONEY_COMPLETE } from 'lib/constants';
import './BckDetailForm.css';

const BckDetailForm = ({
    bckInfo,
    remainDate,
    onModifyClick,
    comma
}) => {
    return (
        <div className='bck-detail-form'>
          {
              bckInfo.completeType === MONEY_COMPLETE &&
              <BckMoneyInfo
                  bckTitle={bckInfo.bckTitle}
                  targetAmount={bckInfo.targetAmount}
                  currentAmount={bckInfo.currentAmount}
                  comma={comma}
              />
          }

          <BckDateInfo
            bckTitle={bckInfo.bckTitle}
            startDate={bckInfo.startDate}
            completeDate={bckInfo.completeDate}
            remainDate={remainDate}
          />
          <CardBlock
              headerTitle={bckInfo.bckTitle + ' 상세 내용'}
              headerSubArea=''>
            <span>{bckInfo.bckDetail}</span>
          </CardBlock>
          {
            bckInfo.completeType === MONEY_COMPLETE &&
            <BckDepositInfo
                depositList={bckInfo.depositList}
                comma={comma}
            />
          }

          <BottomButton
                bottomButtonName='수정하기'
                onButtonClick={onModifyClick}
                color='whiteBlue'
          />
        </div>
  );
};
 
export default BckDetailForm;