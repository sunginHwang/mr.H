import React from 'react';
import PropertyProgressInfo from 'components/Property/Detail/PropertyProgressInfo';
import PropertySavingDepositInfo from 'components/Property/Detail/PropertySavingDepositInfo';
import PropertyDepositInfo from 'components/Property/Detail/PropertyDepositInfo';
import BottomTwoButton from 'components/common/Button/BottomTwoButton';
import { SAVING_DEPOSIT, FIXED_DEPOSIT } from 'lib/constants';

const PropertyDetailForm = ({
    propertyTitle,
    targetAmount,
    startDate,
    completeDate,
    depositType,
    depositList,
    getCurrentAmount,
    getRemainDatePercentage
}) => {
  return (
    <div>
        <PropertyProgressInfo
            title={propertyTitle}
            targetAmount={targetAmount}
            startDate={startDate}
            completeDate={completeDate}
            passedDate={getRemainDatePercentage(startDate,completeDate)}
        />
        {
            depositType === SAVING_DEPOSIT &&
            <PropertySavingDepositInfo
                targetAmount={targetAmount}
                currentAmount={getCurrentAmount(depositList)}
            />
        }
        <PropertyDepositInfo
            depositList={depositList}
        />
        <BottomTwoButton
            onLeftBtnClick={(e)=>{console.log(1)}}
            leftBtnName='입금'
            leftColor='whiteBlue'
            onRightBtnClick={(e)=>{console.log(1)}}
            rightBtnName='삭제'
            rightColor='apricot'
        />
    </div>
  );
};
 
export default PropertyDetailForm;