import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import { Icon } from 'semantic-ui-react';
import { getRemainDate, getTodayForYYYYMMDD } from 'lib/util';
import './PropertyList.css';
 
const PropertyList = ({
    fixedDeposit,
    SavingDeposit,
    onShowDetail,
    comma
}) => {

    const IconTag = <Icon name='ellipsis horizontal' size='large'/>;

    const fixedDepositRowList = fixedDeposit.length === 0 ?
        <CardItem title='예금내역이 없습니다.'/>:
        fixedDeposit.map((depositInfo) => {
            const depositCompleteRemainDate = getRemainDate(getTodayForYYYYMMDD(), depositInfo.completeDate);
            let depositTitle = depositInfo.propertyTitle;

            depositCompleteRemainDate > 0 ? depositTitle += ' (만기까지 '+depositCompleteRemainDate+'일 남음)'
                                          : depositTitle += ' (만기완료)';

            return <div key={depositInfo.propertyIdx}
                            onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}>
                            <CardItem key={depositInfo.propertyIdx}
                                      title={depositTitle}
                                      subTitle={'예금액 :'+comma(depositInfo.targetAmount)}
                                      extColor='brand'
                                      extInfo={IconTag}/>
                    </div>
    });

    const SavingDepositRowList = SavingDeposit.length === 0 ?
        <CardItem title='적금내역이 없습니다.'/>:
        SavingDeposit.map((depositInfo) => {
            const SaveMoneyList = depositInfo.depositLists;
            const totalSaveMoney = SaveMoneyList.reduce((prev, save) => prev + save.depositAmount, 0);
            const remainMoney = depositInfo.targetAmount-totalSaveMoney;
            let saveDepositTitle = depositInfo.propertyTitle;

            remainMoney > 0 ? saveDepositTitle+=' (목표까지 '+comma(remainMoney)+'원 남음)'
                            : saveDepositTitle+=' (만기완료)';

            return  <div key={depositInfo.propertyIdx}
                         onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}>
                            <CardItem key={depositInfo.propertyIdx}
                                      title={saveDepositTitle}
                                      onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}
                                      subTitle={'적금만기금액 :'+comma(depositInfo.targetAmount)}
                                      extColor='brand'
                                      extInfo={IconTag}/>
                    </div>

    });

    return (
        <div className='property-list'>
            <CardBlock
                headerTitle='적금 리스트'
                headerSubArea=''>
                {SavingDepositRowList}
            </CardBlock>
            <CardBlock
                headerTitle='예금 리스트'
                headerSubArea=''>
                {fixedDepositRowList}
            </CardBlock>
        </div>
    );
};
 
export default PropertyList;