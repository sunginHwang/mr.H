import React, { Component} from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as propertyListActions from 'store/modules/propertyList';
import PropertyListToggle from 'components/Property/List/PropertyListToggle';
import PropertyList from 'components/Property/List/PropertyList';
import InsertButton from 'components/common/Button/InsertButton';
import BeatLoading from 'components/common/Loading/BeatLoading';
import { SAVING_DEPOSIT, FIXED_DEPOSIT } from 'lib/constants';
import { comma, isBiggerThenToday } from 'lib/util';


class PropertyListContainer extends Component {

    componentDidMount() {
        this.loadPropertyList();
    }

    loadPropertyList = () => {
        const { propertyListActions } = this.props;
        propertyListActions.loadPropertyList();
    };

    handleTogglePropertyMode = (modalType) => {
        const { propertyListActions } = this.props;
        propertyListActions.changePropertyToggleMode(modalType);
    };

   handleShowPropertyDetail = (propertyIdx) => {
       this.props.history.push('/property/detail/' + propertyIdx);
   };

   getPropertyList = () => {
       const { propertyList, propertyToggleMode } = this.props;
       return propertyToggleMode === 'complete' ?
                   propertyList.filter(x => isBiggerThenToday(x.completeDate)) :
                   propertyList.filter(x => !isBiggerThenToday(x.completeDate))
   };

  render() {
    const { propertyToggleMode, propertyListLoading } = this.props;
    const { handleShowPropertyDetail, handleTogglePropertyMode, getPropertyList } = this;

    const PropertyLists = getPropertyList();

    const fixedDeposit = PropertyLists.filter(x => x.typeIdx === FIXED_DEPOSIT);
    const SavingDeposit = PropertyLists.filter(x => x.typeIdx === SAVING_DEPOSIT);

    if(propertyListLoading) return <BeatLoading loading={propertyListLoading}/>;

      return (
      <div>
         <PropertyListToggle
             onToggleClick={handleTogglePropertyMode}
             toggleMode={propertyToggleMode}/>
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
        propertyListLoading: state.pender.pending['propertyList/LOAD_BCK_DETAIL_INFO'],
        propertyList: state.propertyList.get('propertyList').toJS(),
        propertyToggleMode : state.propertyList.get('propertyToggleMode')
    }),
    (dispatch) => ({
        propertyListActions: bindActionCreators(propertyListActions, dispatch),
    })
)(PropertyListContainer);
