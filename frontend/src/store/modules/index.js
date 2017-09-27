import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import board from './board';
export default combineReducers({
    board,
    pender: penderReducer
});