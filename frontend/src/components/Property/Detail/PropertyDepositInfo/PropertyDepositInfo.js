import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import CardItem from 'components/common/Item/CardItem';
import './PropertyDepositInfo.css';

const PropertyDepositInfo = ({
    depositList,
    comma
}) => {
    const depositRowList = depositList.length === 0 ?
        <CardItem title='입금내역이 없습니다.'/> :
        depositList.map((depositInfo) => (
        <CardItem key={depositInfo.depositIdx}
                  title={depositInfo.depositDate}
                  subTitle=''
                  extColor='darkGray'
                  extInfo={comma(depositInfo.depositAmount)+' 원'}/>
    ));

    return (
        <div style={{paddingLeft:'0.3em', paddingRight:'0.3em'}}>
            <CardBlock
                headerTitle='입금내역'
                radius={true}
                headerSubArea=''>
                {depositRowList}
            </CardBlock>
        </div>

    );
};

export default PropertyDepositInfo;