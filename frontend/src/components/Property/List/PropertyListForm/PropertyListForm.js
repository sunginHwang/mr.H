import React from 'react';
import CardBlock from 'components/common/Block/CardBlock';
import PropertyLineChart from 'components/Property/PropertyLineChart';
import './PropertyListForm.css';
const PropertyListForm = ({
    propertyMoneyList
}) => {
  return (
      <div className="property-list-form">
          <CardBlock
              headerTitle='자산 증가표(반년)'
              headerSubArea = ''>
              <PropertyLineChart
                  chartData={propertyMoneyList}
                  yAxisKey='date'
                  xAxisKey='totalMoney'
                  chartLineColor='#8884d8'
              />
          </CardBlock>
      </div>
  );
};
 
export default PropertyListForm;