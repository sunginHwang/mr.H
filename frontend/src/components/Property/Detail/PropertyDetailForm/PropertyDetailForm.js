import React from 'react';
import PropertyProgressInfo from 'components/Property/Detail/PropertyProgressInfo';
import PropertySavingDepositInfo from 'components/Property/Detail/PropertySavingDepositInfo';
import PropertyDepositInfo from 'components/Property/Detail/PropertyDepositInfo';
import BottomTwoButton from 'components/common/Button/BottomTwoButton';
import BottomButton from 'components/common/Button/BottomButton';
import { SAVING_DEPOSIT, FIXED_DEPOSIT } from 'lib/constants';

const PropertyDetailForm = ({
    propertyTitle,
    targetAmount,
    startDate,
    completeDate,
    depositType,
    depositList,
    getCurrentAmount,
    getRemainDatePercentage,
    comma,
    onDepositSaveClick,
    onPropertyDeleteClick
}) => {
  return (
    <div>
        <PropertyProgressInfo
            title={propertyTitle}
            targetAmount={comma(targetAmount)}
            startDate={startDate}
            completeDate={completeDate}
            passedDate={getRemainDatePercentage(startDate,completeDate)}
        />
        {
            depositType === SAVING_DEPOSIT &&
            <PropertySavingDepositInfo
                targetAmount={targetAmount}
                currentAmount={getCurrentAmount(depositList)}
                comma={comma}
            />
        }
        <PropertyDepositInfo
            depositList={depositList}
            comma={comma}
        />
        {
            depositType === SAVING_DEPOSIT ?
                <BottomTwoButton
                    onLeftBtnClick={onDepositSaveClick}
                    leftBtnName='입금'
                    leftColor='whiteBlue'
                    onRightBtnClick={onPropertyDeleteClick}
                    rightBtnName='삭제'
                    rightColor='apricot'
                /> :
                <BottomButton
                    bottomButtonName='삭제'
                    onButtonClick={onPropertyDeleteClick}
                    color='whiteBlue'
                />
        }
    </div>
  );
};
 
export default PropertyDetailForm;