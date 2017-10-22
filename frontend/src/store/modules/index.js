import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import mainList from './mainList';
import mainHeader from './mainHeader';
import board from './board';
import user from  './user';
import bckList from './bckList';
import bckSave from './bckSave';
import bckDetail from './bckDetail';
import propertyList from './propertyList';

export default combineReducers({
    board,
    mainList,
    mainHeader,
    user,
    bckList,
    bckSave,
    bckDetail,
    propertyList,
    pender: penderReducer
});