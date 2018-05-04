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
import BottomSlideModal from 'components/common/Modal/BottomSlideModal';
import SlideModalLabel from 'components/common/Label/SlideModalLabel';
import { SAVING_DEPOSIT, FIXED_DEPOSIT } from 'lib/constants';
import { comma, isBiggerThenToday } from 'lib/util';


class PropertyListContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            insertModalVisible: false
        };
    };

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

   togglePropertyInsertModal = () => {
       this.setState({insertModalVisible: !this.state.insertModalVisible})
   };

  render() {
    const { propertyToggleMode, propertyListLoading } = this.props;
    const { handleShowPropertyDetail, handleTogglePropertyMode, getPropertyList, togglePropertyInsertModal } = this;

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
              <div onClick={(e)=>{togglePropertyInsertModal();}}>
                  <span>예금,적금 등록하기</span>
              </div>
          </InsertButton>
          <BottomSlideModal
              visible={this.state.insertModalVisible}
              title='예금, 적금 종류를 선택해 주세요.'
              cancelClick={(e)=>{togglePropertyInsertModal();}}>
              <Link to='/property/insert/1'>
                 <SlideModalLabel title='예금 만들기'/>
              </Link>
              <Link to='/property/insert/2'>
                  <SlideModalLabel title='적금 만들기'/>
              </Link>
          </BottomSlideModal>

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
