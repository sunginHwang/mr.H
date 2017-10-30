import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import OneLevelPieChart from 'components/common/Chart/OneLevelPieChart';

const PropertyChartInfo = ({
    propertyTitle,
    targetAmount,
    currentAmount
}) => {
    const chartData = [
                        {name: '모은금액', value: currentAmount},
                        {name: '남은 금액', value: targetAmount - currentAmount}
    ];
    const targetPercentage = '달성률 '+(currentAmount/targetAmount)*100 + '%';

    return (
        <CardBlock
            headerTitle={propertyTitle + ' 저축 통계'}
            headerSubArea=''>
            <OneLevelPieChart
                data={chartData}
                cx='40%'
                cy='50%'
                width={300}
                height={250}
                legentAlign='right'
                centerLableValue={targetPercentage}
            />
        </CardBlock>
    );
};

export default PropertyChartInfo;