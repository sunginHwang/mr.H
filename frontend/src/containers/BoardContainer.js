import React, { Component } from 'react';

// import redux dependencies
import BoardTodo from 'components/board/BoardTodo'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as boardActions from 'store/modules/board';

class BoardContainer extends Component {

    handleButtonClick = () => {
        console.log('btnClick');
        const { boardActions } = this.props;
        boardActions.boardTodo();
    }

    render() {
        const { handleButtonClick } = this;
        const { author } = this.props;

        return (
            <BoardTodo
                handleButtonClick={handleButtonClick}
                author={author}
            />
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
)(BoardContainer);
