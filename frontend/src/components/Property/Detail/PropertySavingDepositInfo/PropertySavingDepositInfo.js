import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import './PropertySavingDepositInfo.css';
const PropertySavingDepositInfo = ({
    targetAmount,
    currentAmount,
    comma
}) => {
  return (
      <CardBlock
          headerTitle='적금내역'
          headerSubArea=''>
          <CardItem title='목표금액'
                    extInfo={comma(targetAmount)+' 원'}
                    extColor='danger'
                    subTitle=''/>
          <CardItem title='현재 모은 총액'
                    extInfo={comma(currentAmount)+' 원'}
                    extColor='ocean'
                    subTitle=''/>
          <CardItem title='남은 입금 액수'
                    extInfo={(comma(targetAmount-currentAmount))+' 원'}
                    extColor='teal'
                    subTitle=''/>
      </CardBlock>
  );
};
 
export default PropertySavingDepositInfo;