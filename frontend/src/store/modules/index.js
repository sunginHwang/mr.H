import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import board from './board';
import bckLstList from './bckLstList';

export default combineReducers({
    board,
    bckLstList,
    pender: penderReducer
});