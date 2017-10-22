import React from 'react';
import CardItem from 'components/common/Item/CardItem';
import { getRemainDate } from 'lib/util';
import './PropertyList.css';
 
const PropertyList = ({
    propertyList
}) => {


    const propertyRowList = propertyList.map((propertyInfo) => (
        <CardItem key={propertyInfo.propertyIdx}
                  title={propertyInfo.propertyTitle+' (목표까지 '+getRemainDate(propertyInfo.propertyStartDate, propertyInfo.propertyEndDate)+'일 남음)'}
                  subTitle={'목표금액 :'+propertyInfo.propertyTargetAmount}
                  extColor='brand'
                  extInfo={propertyInfo.propertyCurrentAmount+' 원'}/>
    ));

    return (
        <div className='property-list'>
            {propertyRowList}
        </div>
    );
};
 
export default PropertyList;