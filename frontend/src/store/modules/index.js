import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import mainList from './mainList';
import mainHeader from './mainHeader';
import user from  './user';
import auth from  './auth';
import bckList from './bckList';
import bckSave from './bckSave';
import bckDetail from './bckDetail';
import propertyList from './propertyList';
import propertySave from './propertySave';
import propertyDetail from './propertyDetail';

export default combineReducers({
    mainList,
    mainHeader,
    user,
    auth,
    bckList,
    bckSave,
    bckDetail,
    propertyList,
    propertySave,
    propertyDetail,
    pender: penderReducer
});