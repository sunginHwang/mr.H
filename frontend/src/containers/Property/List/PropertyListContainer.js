import React, { Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as propertyListActions from 'store/modules/propertyList';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CardBlock from 'components/common/Block/CardBlock';

class PropertyListContainer extends Component {


  render() {
      const { propertyMoneyList } = this.props;
      const data = propertyMoneyList.toJS();
      console.log(data);
    return (
      <div>
          <CardBlock
              headerTitle='자산차트 리스트'
              headerSubArea = ''>
              <ResponsiveContainer width='100%' height={200}>
                  <AreaChart  data={data}
                              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                      <XAxis dataKey="date"/>
                      <YAxis/>
                      <Tooltip/>
                      <Area type='monotone' dataKey='totalMoney' stroke='#8884d8' fill='#8884d8' />
                  </AreaChart>
              </ResponsiveContainer>
          </CardBlock>
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
