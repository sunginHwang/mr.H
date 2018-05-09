import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import './BckDateInfo.css';

const BckDateInfo = ({
    bckTitle,
    startDate,
    completeDate,
    remainDate
}) => {
  return (
      <CardBlock
          radius={true}
          shadow={true}
          headerTitle={bckTitle + ' 일자 정보'}
          headerSubArea=''>
        <CardItem title='시작일' extInfo={startDate}  subTitle=''/>
        <CardItem title='달성일' extInfo={completeDate}  subTitle=''/>
        <CardItem title='목표달성까지' extInfo={remainDate+'일 남음'} extColor='danger'  subTitle=''/>
      </CardBlock>
  );
};
 
export default BckDateInfo;