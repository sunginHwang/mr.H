import React, { Component} from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as propertyListActions from 'store/modules/propertyList';
import PropertyListToggle from 'components/Property/List/PropertyListToggle';
import PropertyList from 'components/Property/List/PropertyList';
import InsertButton from 'components/common/Button/InsertButton';


class PropertyListContainer extends Component {


  render() {
    const { propertyList } = this.props;

    return (
      <div>
         <PropertyListToggle
             onToggleClick={(e)=>{console.log(1)}}
             toggleMode={'complete'}/>
          <PropertyList
              propertyList={propertyList.toJS()}
          />
          <InsertButton>
              <Link to='/bck/insert'>
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
