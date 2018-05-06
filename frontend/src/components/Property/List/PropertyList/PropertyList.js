import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import { Icon } from 'semantic-ui-react';
import { getRemainDate, getTodayForYYYYMMDD } from 'lib/util';
import PropertyCard from 'components/Property/List/PropertyCard';
import './PropertyList.css';
 
const PropertyList = ({
    fixedDeposit,
    SavingDeposit,
    onShowDetail,
    comma
}) => {

    const IconTag = <Icon name='ellipsis horizontal' size='large'/>;

    const fixedDepositRowList = fixedDeposit.length !== 0 &&
        fixedDeposit.map((depositInfo) => {
            const depositCompleteRemainDate = getRemainDate(getTodayForYYYYMMDD(), depositInfo.completeDate);
            let depositTitle = depositInfo.propertyTitle;
            let sideValue = '';

            depositCompleteRemainDate > 0 ? sideValue += ' (만기까지 '+depositCompleteRemainDate+'일)'
                                          : sideValue += ' (만기완료)';

            return <div key={depositInfo.propertyIdx}
                            onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}>
                            <PropertyCard key={depositInfo.propertyIdx}
                                          headerLeftValue={depositTitle}
                                          headerRightValue={IconTag}
                                          contentValue={comma(depositInfo.targetAmount)}
                                          sideValue={sideValue}
                            />
                    </div>
    });

    const SavingDepositRowList = SavingDeposit.length !== 0 &&
        SavingDeposit.map((depositInfo) => {
            const SaveMoneyList = depositInfo.depositLists;
            const totalSaveMoney = SaveMoneyList.reduce((prev, save) => prev + save.depositAmount, 0);
            const remainMoney = depositInfo.targetAmount-totalSaveMoney;
            let saveDepositTitle = depositInfo.propertyTitle;
            let sideValue = '';
            remainMoney > 0 ? sideValue+=' (목표까지 '+comma(remainMoney)+'원)'
                            : sideValue+=' (만기완료)';

            return  <div key={depositInfo.propertyIdx}
                         onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}>
                            <PropertyCard key={depositInfo.propertyIdx}
                                          headerLeftValue={saveDepositTitle}
                                          headerRightValue={IconTag}
                                          contentValue={comma(depositInfo.targetAmount)}
                                          sideValue={sideValue}
                                     />
                    </div>

    });



    return (
        <div className='property-list'>

            <div style={{marginTop:'3em'}}>
                <div className='property-list-title'>적금내역</div>
                {SavingDepositRowList}
            </div>
            <div style={{marginTop:'3em'}}>
                <div className='property-list-title'>예금내역</div>
                {fixedDepositRowList}
            </div>
        </div>
    );
};
 
export default PropertyList;