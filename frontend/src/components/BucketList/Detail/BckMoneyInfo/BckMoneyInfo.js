import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import OneLevelPieChart from 'components/common/Chart/OneLevelPieChart';

const BckMoneyInfo = ({
    bckTitle,
    targetAmount,
    currentAmount,
    comma
}) => {
  const chartData = [{name: '모은금액', value: currentAmount}, {name: '남은 금액', value: targetAmount - currentAmount}];
  const targetPercentage = '달성률 '+((currentAmount/targetAmount)*100).toFixed(3) + '%';

  return (
      <CardBlock
          radius={true}
          shadow={true}
          headerTitle={bckTitle + ' 금액정보'}
          headerSubArea=''>
          <OneLevelPieChart
              data={chartData}
              cx='40%'
              cy='50%'
              width={300}
              height={230}
              legentAlign='right'
              centerLableValue={targetPercentage}
          />
          <CardItem title='목표금액'
                    extInfo={comma(targetAmount)}
                    extColor='danger'
                    subTitle=''/>
          <CardItem title='모은금액'
                    extInfo={comma(currentAmount)}
                    extColor='ocean'
                    subTitle=''/>
          <CardItem title='남은금액'
                    extInfo={comma(targetAmount-currentAmount)}
                    extColor='teal'
                    subTitle=''/>
      </CardBlock>
  );
};
 
export default BckMoneyInfo;