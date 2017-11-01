import React, { Component} from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as propertyListActions from 'store/modules/propertyList';
import PropertyListToggle from 'components/Property/List/PropertyListToggle';
import PropertyList from 'components/Property/List/PropertyList';
import InsertButton from 'components/common/Button/InsertButton';
import { SAVING_DEPOSIT, FIXED_DEPOSIT } from 'lib/constants';
import { comma } from 'lib/util';


class PropertyListContainer extends Component {

   handleShowPropertyDetail = (propertyIdx) => {
       this.props.history.push('/property/detail/' + propertyIdx);
   }

  render() {
    const { propertyList } = this.props;
    const { handleShowPropertyDetail } = this;
    const propertyListJS = propertyList.toJS();
    const fixedDeposit = propertyListJS.filter(x => x.depositType === FIXED_DEPOSIT);
    const SavingDeposit = propertyListJS.filter(x => x.depositType === SAVING_DEPOSIT);

      return (
      <div>
         <PropertyListToggle
             onToggleClick={(e)=>{console.log(1)}}
             toggleMode={'complete'}/>
          <PropertyList
              fixedDeposit={fixedDeposit}
              SavingDeposit={SavingDeposit}
              onShowDetail={handleShowPropertyDetail}
              comma={comma}
          />
          <InsertButton>
              <Link to='/property/insert'>
                  <Icon name='won'
                        style={{color:'#fff'}}
                        size='big'/>
              </Link>
          </InsertButton>
      </div>
    );
  }
}

export default connect(
    (state) => ({
        propertyList: state.propertyList.get('propertyList')
    }),
    (dispatch) => ({
        propertyListActions: bindActionCreators(propertyListActions, dispatch),
    })
)(PropertyListContainer);
