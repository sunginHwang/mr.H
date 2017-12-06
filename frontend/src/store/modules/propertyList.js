import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, fromJS, List } from 'immutable';
import axios from 'axios';

//액션타입
const LOAD_PROPERTY_LIST_INFO = 'propertyList/LOAD_BCK_DETAIL_INFO';
const CHANGE_PROPERTY_TOGGLE_MODE = 'propertyList/CHANGE_PROPERTY_TOGGLE_MODE';

//비동기 호출
export const apiGetPropertyList = () => axios.get('/api/property/list');

//액션 생성자
export const loadPropertyList = createAction(LOAD_PROPERTY_LIST_INFO,apiGetPropertyList);
export const changePropertyToggleMode = createAction(CHANGE_PROPERTY_TOGGLE_MODE);



//초기값
const initialState = Map({
    propertyToggleMode : 'proceeding',
    propertyList : List([])
});

// 리듀서
export default handleActions({
    ...pender({
        type: LOAD_PROPERTY_LIST_INFO,
        onSuccess: (state, action) => {
            return state.set('propertyList',fromJS(action.payload.data));
        }
    }),
    [CHANGE_PROPERTY_TOGGLE_MODE] : (state, action) => {
        return state.set('propertyToggleMode', action.payload);
    },
}, initialState);