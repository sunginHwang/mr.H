import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import mainList from './mainList';
import board from './board';
import bckList from './bckList';
import bckSave from './bckSave';
import bckDetail from './bckDetail';
import propertyList from './propertyList';

export default combineReducers({
    board,
    mainList,
    bckList,
    bckSave,
    bckDetail,
    propertyList,
    pender: penderReducer
});