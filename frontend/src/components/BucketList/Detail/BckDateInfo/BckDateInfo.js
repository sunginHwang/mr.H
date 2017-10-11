import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import './BckDateInfo.css';

const BckDateInfo = ({
    bckTitle,
    regiDate,
    completeDate,
    remainDate
}) => {
  return (
      <CardBlock
          headerTitle = {bckTitle + ' 일자 정보'}
          headerSubArea = ''>
        <CardItem title = '시작일' extInfo = {regiDate}  subTitle= ''/>
        <CardItem title = '달성일' extInfo = {completeDate}  subTitle= ''/>
        <CardItem title = '목표달성까지' extInfo = {remainDate+'일 남음'}  subTitle= ''/>
      </CardBlock>
  );
};
 
export default BckDateInfo;