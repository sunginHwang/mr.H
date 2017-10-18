import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import './PropertyList.css';
 
const PropertyList = ({
    propertyList
}) => {
    const propertyRowList = propertyList.map((propertyInfo) => (
        <CardItem key= {propertyInfo.propertyIdx}
                  title= {propertyInfo.propertyTitle+' (목표까지 111일)'}
                  subTitle = {'목표금액 :'+propertyInfo.propertyTargetAmount}
                  extColor = 'brand'
                  extInfo = {propertyInfo.propertyCurrentAmount+' 원'}/>
    ));

    return (
        <div className='property-list'>
            <CardBlock
                headerTitle = '예금 적금 내역'
                headerSubArea = ''>
                {propertyRowList}
            </CardBlock>
        </div>
    );
};
 
export default PropertyList;