import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import PropertyLineChart from 'components/Main/List/PropertyLineChart';
import DepositList from 'components/Main/List/DepositList';
import { progressColor } from 'lib/variables';

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
    propertyList
}) => {

    const depositList = propertyList.map((data) =>
        (
            <DepositList
                key={data.propertyIdx}
                propertyIdx={data.propertyIdx}
                depositTitle={data.propertyTitle}
                startDate={data.propertyStartDate}
                completeDate={data.propertyEndDate}
                currentAmount={data.propertyCurrentAmount}
                targetAmount={data.propertyTargetAmount}
                progressColor={progressColor[Math.floor(progressColor.length % data.propertyIdx)]} // randomColorProcess
            />
        )
    );

  return (
      <div className="property-list-form">
          <CardBlock
              headerTitle='현재 모은 금액'
              headerSubArea={<TotalMoneyArea totalMoney={400000} />}>
              <CardItem title='현재 자본금'
                        extInfo={200000+' 원'}
                        extColor='ocean'
                        subTitle=''/>
              <CardItem title='예금, 적금 합계'
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
                  xAxisKey='totalMoney'
                  chartLineColor='#8884d8'
              />
          </CardBlock>
          <CardBlock
              headerTitle='예금, 적금 리스트'
              headerSubArea=''>
              {depositList}
          </CardBlock>

      </div>
  );
};
 
export default MainListForm;