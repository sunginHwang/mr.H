import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import PropertyLineChart from 'components/Main/List/PropertyLineChart';
import ItemListForm from 'components/Main/List/ItemListForm';
import { progressColor } from 'lib/variables';
import { SAVING_DEPOSIT, DATE_COMPLETE } from 'lib/constants';

import './MainListForm.css';

const TotalMoneyArea = ({
    totalMoney
}) => {
    return (
        <span style={{color:'#f4516c' ,fontWeight:600, fontSize:'1.2rem' }}>{totalMoney+' 원'}</span>
    );
};

const MainListForm = ({
    propertyMoneyList,
    propertyList,
    bckList,
    currentLowAmount,
    filterBckListForCompleteType,
    getRemainDatePercentage
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

    const bucketListForm = bckList.map((data) =>
        (
            <ItemListForm
                key={data.bckIdx}
                title={data.bckTitle}
                percent={data.typeIdx === DATE_COMPLETE ? getRemainDatePercentage(data.startDate,data.completeDate):
                                                               parseInt(((data.targetAmount/data.targetAmount)*100),10)
                }
                progressColor={progressColor[Math.floor(progressColor.length % data.bckIdx)]} // randomColorProcess
            />
        )
    );

  return (
      <div className="property-list-form">
          <CardBlock
              headerTitle='현재 모은 금액'
              headerSubArea={<TotalMoneyArea totalMoney={400000} />}>
              <CardItem title='예금'
                        extInfo={200000+' 원'}
                        extColor='ocean'
                        subTitle=''/>
              <CardItem title='적금'
                        extInfo={200000+' 원'}
                        extColor='teal'
                        subTitle=''/>
          </CardBlock>
          <CardBlock
              headerTitle='최근 자산 증감표'
              headerSubArea=''>
              <PropertyLineChart
                  chartData={propertyMoneyList}
                  yAxisKey='date'
                  xAxisKey='totalAmount'
                  chartLineColor='#8884d8'
              />
          </CardBlock>
          <CardBlock
              headerTitle='예금, 적금 리스트'
              headerSubArea=''>
              {depositListForm}
          </CardBlock>
          <CardBlock
              headerTitle='버킷리스트'
              headerSubArea=''>
              {bucketListForm}
          </CardBlock>
      </div>
  );
};
 
export default MainListForm;