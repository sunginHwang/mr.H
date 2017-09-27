import React, { Component } from 'react';

// import redux dependencies
import BoardTodo from 'components/board/BoardTodo';
import BckLstListForm from 'components/BucketList/List/BckLstListForm';
import MainHeader from 'components/common/Header/MainHeader';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as boardActions from 'store/modules/board';

import { InitinalBlListData } from 'lib/testValue';

class BckLstListContainer extends Component {

    handleButtonClick = () => {
        console.log('btnClick');
        const { boardActions } = this.props;
        boardActions.boardTodo();
    };

    render() {
        const { handleButtonClick } = this;
        const { author } = this.props;
        const BucketListListData = InitinalBlListData;

        return (
           <div>
               <MainHeader/>
               <div>
                   <BckLstListForm
                       BucketListListData={BucketListListData}
                   />
               </div>
           </div>
        );
    }
}

export default connect(
    (state) => ({
        author: state.board.get('author')
    }),
    (dispatch) => ({
        boardActions: bindActionCreators(boardActions, dispatch)
    })
)(BckLstListContainer);
