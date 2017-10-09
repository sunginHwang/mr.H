import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import board from './board';
import bckList from './bckList';
import bckInsert from './bckInsert';
import bckDetail from './bckDetail';

export default combineReducers({
    board,
    bckList,
    bckInsert,
    bckDetail,
    pender: penderReducer
});