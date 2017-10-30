import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import { getRemainDate } from 'lib/util';
import './PropertyList.css';
 
const PropertyList = ({
    fixedDeposit,
    SavingDeposit,
    onShowDetail
}) => {


    const fixedDepositRowList = fixedDeposit.length === 0 ?
        <CardItem title='예금내역이 없습니다.'/>:
        fixedDeposit.map((depositInfo) => (
        <div key={depositInfo.propertyIdx}
            onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}>
            <CardItem key={depositInfo.propertyIdx}
                      title={depositInfo.propertyTitle+' (목표까지 '+getRemainDate(depositInfo.startDate, depositInfo.completeDate)+'일 남음)'}
                      subTitle={'예금액 :'+depositInfo.targetAmount}
                      extColor='brand'
                      extInfo={depositInfo.targetAmount+' 원'}/>
        </div>
    ));

    const SavingDepositRowList = SavingDeposit.length === 0 ?
        <CardItem title='적금내역이 없습니다.'/>:
        SavingDeposit.map((depositInfo) => {
        const SaveMoneyList = depositInfo.saveMoneyList.toJS();
        const totalSaveMoney = SaveMoneyList.reduce((prev, save) => prev + save.money, 0);
        return  <div key={depositInfo.propertyIdx}
                     onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}>
                        <CardItem key={depositInfo.propertyIdx}
                                  title={depositInfo.propertyTitle+' (목표까지 '+(depositInfo.targetAmount-totalSaveMoney)+'원 남음)'}
                                  onClick={(e)=>{onShowDetail(depositInfo.propertyIdx)}}
                                  subTitle={'적금만기금액 :'+depositInfo.targetAmount}
                                  extColor='brand'
                                  extInfo={totalSaveMoney+' 원'}/>
                </div>

    });

    return (
        <div className='property-list'>
            <CardBlock
                headerTitle='통장 저금 리스트'
                headerSubArea=''>
                {fixedDepositRowList}
                {SavingDepositRowList}
            </CardBlock>

        </div>
    );
};
 
export default PropertyList;