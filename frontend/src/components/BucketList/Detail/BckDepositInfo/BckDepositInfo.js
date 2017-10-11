import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import './BckDepositInfo.css';

const BckDepositInfo = ({
    depositList
}) => {

    const depositRowList = depositList.map((depositInfo) => (
        <CardItem key= {depositInfo.depositIdx}
                  title= {depositInfo.depositDate}
                  subTitle= ''
                  extInfo = {depositInfo.depositAmount+' 원'}/>
    ));

  return (
      <CardBlock
          headerTitle = '입금내역'
          headerSubArea = ''>
          {depositRowList}
      </CardBlock>
  );
};
 
export default BckDepositInfo;