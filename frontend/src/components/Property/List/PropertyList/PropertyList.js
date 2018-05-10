import React from 'react';
import { Icon } from 'semantic-ui-react';
import { getRemainDate, getTodayForYYYYMMDD, isBiggerThenToday } from 'lib/util';
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
            const isPropertyProgressEnd = isBiggerThenToday(depositInfo.completeDate) && depositInfo.delFlag == 'N';

            let sideValue = '';
            let contentValue = comma(depositInfo.targetAmount);

            depositCompleteRemainDate > 0 ? sideValue += ' (만기까지 '+depositCompleteRemainDate+'일)'
                                          : sideValue += ' (만기완료)';

            if(isPropertyProgressEnd){
                contentValue = '만기완료';
                sideValue = '상세보기에서 만기완료를 선택해주세요';
            }

            return <div key={depositInfo.propertyIdx}
                        onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}>
                          <PropertyCard key={depositInfo.propertyIdx}
                                          headerLeftValue={depositTitle}
                                          headerRightValue={IconTag}
                                          contentValue={contentValue}
                                          complete={isPropertyProgressEnd}
                                          sideValue={sideValue}/>
                    </div>
    });

    const SavingDepositRowList = SavingDeposit.length !== 0 &&
        SavingDeposit.map((depositInfo) => {
            const SaveMoneyList = depositInfo.depositLists;
            const totalSaveMoney = SaveMoneyList.reduce((prev, save) => prev + save.depositAmount, 0);
            const remainMoney = depositInfo.targetAmount-totalSaveMoney;
            const isPropertyProgressEnd = isBiggerThenToday(depositInfo.completeDate) && depositInfo.delFlag == 'N';

            let sideValue = '';
            let contentValue = comma(depositInfo.targetAmount);

            remainMoney > 0 ? sideValue+=' (목표까지 '+comma(remainMoney)+'원)'
                            : sideValue+=' (만기완료)';

            if(isPropertyProgressEnd){
                contentValue = '만기완료';
                sideValue = '상세보기에서 만기완료를 선택해주세요';
            }

            return  <div key={depositInfo.propertyIdx}
                         onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}>
                            <PropertyCard key={depositInfo.propertyIdx}
                                          headerLeftValue={depositInfo.propertyTitle}
                                          headerRightValue={IconTag}
                                          contentValue={contentValue}
                                          complete={isPropertyProgressEnd}
                                          sideValue={sideValue} />
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