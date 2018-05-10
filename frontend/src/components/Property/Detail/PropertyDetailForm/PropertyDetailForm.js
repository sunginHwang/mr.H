import React from 'react';
import PropertyProgressInfo from 'components/Property/Detail/PropertyProgressInfo';
import PropertySavingDepositInfo from 'components/Property/Detail/PropertySavingDepositInfo';
import PropertyDepositInfo from 'components/Property/Detail/PropertyDepositInfo';
import BottomTwoButton from 'components/common/Button/BottomTwoButton';
import { Icon } from 'semantic-ui-react';
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
    toggleSlideModal
}) => {
    /*적금타입*/
  const isSaveDeposit = depositType === SAVING_DEPOSIT;

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
        <BottomTwoButton
            onLeftBtnClick={isSaveDeposit ? onDepositSaveClick : ''}
            leftBtnName={isSaveDeposit ? '입금하기' : ''}
            leftColor={isSaveDeposit ? 'deepBlue' : ''}
            onRightBtnClick={toggleSlideModal}
            rightBtnName={<Icon name='content' size='large'/>}
            rightColor='apricot'
        />
    </div>
  );
};
 
export default PropertyDetailForm;