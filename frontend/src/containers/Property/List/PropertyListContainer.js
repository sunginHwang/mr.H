import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as propertyListActions from 'store/modules/propertyList';
import CardBlock from 'components/common/Block/CardBlock';
import {LineChart, Line , XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropertyListForm from 'components/Property/List/PropertyListForm';



class PropertyListContainer extends Component {


  render() {
      const { propertyMoneyList } = this.props;
      const data = propertyMoneyList.toJS();
      console.log(data);
    return (
      <div>
          <PropertyListForm
              propertyMoneyList={data}
          />
      </div>
    );
  }
}

export default connect(
    (state) => ({
        propertyMoneyList: state.propertyList.get('propertyMoneyList'),
        propertyList: state.propertyList.get('propertyList')
    }),
    (dispatch) => ({
        propertyListActions: bindActionCreators(propertyListActions, dispatch),
    })
)(PropertyListContainer);
