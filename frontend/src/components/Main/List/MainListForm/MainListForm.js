import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import PropertyLineChart from 'components/Main/List/PropertyLineChart';
import PropertyAreaChart from 'components/Main/List/PropertyAreaChart';
import TotalMoneyForm from 'components/Main/List/TotalMoneyForm';
import ItemListForm from 'components/Main/List/ItemListForm';
import { progressColor } from 'lib/variables';
import { SAVING_DEPOSIT, DATE_COMPLETE , FIXED_DEPOSIT} from 'lib/constants';

import './MainListForm.css';


const MainListForm = ({
    propertyMoneyList,
    propertyList,
    bckList,
    currentLowAmount,
    filterBckListForCompleteType,
    getCurrentLowAmount,
    getDepositTotalMoney,
    getRemainDatePercentage,
    comma
}) => {

    const depositListForm = propertyList.map((data) =>
        (
            <ItemListForm
                key={data.propertyIdx}
                title={data.typeIdx === SAVING_DEPOSIT ? data.propertyTitle+' (적금)'
                                                           : data.propertyTitle+' (예금)'}
                percent={getRemainDatePercentage(data.startDate,data.completeDate)}
                progressColor={progressColor[Math.floor(progressColor.length % data.propertyIdx)]} // randomColorProcess
            />
        )
    );

    const bucketListForm = bckList.map((bckInfo) =>
        (
            <ItemListForm
                key={bckInfo.bckIdx}
                title={bckInfo.bckTitle}
                percent={bckInfo.typeIdx === DATE_COMPLETE ? getRemainDatePercentage(bckInfo.startDate,bckInfo.completeDate):
                                                               parseInt(getDepositTotalMoney(bckInfo.depositLists)/bckInfo.targetAmount*100,10)
                }
                progressColor={progressColor[Math.floor(progressColor.length % bckInfo.bckIdx)]} // randomColorProcess
            />
        )
    );

  return (
      <div className="property-list-form">
          <TotalMoneyForm
              money={comma(currentLowAmount.reduce((prev, save) => prev + save.totalMoney, 0))}
          />
          <div style={{marginTop:'2em', marginBottom:'2em'}}>
              <PropertyAreaChart
                  chartData={propertyMoneyList}
                  xAxisKey='totalAmount'
              />
          </div>
         {/* <CardBlock
              radius={true}
              shadow={true}
              headerTitle='최근 자산 증감표'
              headerSubArea=''>
              <PropertyLineChart
                  chartData={propertyMoneyList}
                  yAxisKey='date'
                  xAxisKey='totalAmount'
                  chartLineColor='#8884d8'
              />
          </CardBlock>*/}
          <CardBlock
              radius={true}
              shadow={true}
              headerTitle='예금, 적금 현황'>
              <CardItem title='예금'
                        extInfo={getCurrentLowAmount(currentLowAmount,FIXED_DEPOSIT)+' 원'}
                        extColor='ocean'
                        subTitle=''/>
              <CardItem title='적금'
                        extInfo={getCurrentLowAmount(currentLowAmount,SAVING_DEPOSIT)+' 원'}
                        extColor='teal'
                        subTitle=''/>
          </CardBlock>
          <CardBlock
              radius={true}
              shadow={true}
              headerTitle='예금, 적금 리스트'
              headerSubArea=''>
              {depositListForm}
          </CardBlock>
          <CardBlock
              radius={true}
              shadow={true}
              headerTitle='버킷리스트'
              headerSubArea=''>
              {bucketListForm}
          </CardBlock>
      </div>
  );
};
 
export default MainListForm;