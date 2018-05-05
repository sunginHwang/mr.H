import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import axiosAuth from 'lib/axiosAuth';
import { getErrorMsg } from 'lib/util';


//액션타입
const LOAD_BCK_LIST = 'bckList/LOAD_BCK_LIST';
const CHANGE_BCK_TOGGLE_MODE = 'bckList/CHANGE_BCK_TOGGLE_MODE';

//서버호출
export const apiGetList = () => axiosAuth.get('/api/bucketList/list');

//액션 생성자
export const loadBckList = createAction(LOAD_BCK_LIST,apiGetList);
export const changeBckToggleMode = createAction(CHANGE_BCK_TOGGLE_MODE);

//초기값
const initialState = Map({
    notifyMessage : '',
    bckToggleMode : 'proceeding',
    bckList : List([])
});

// 리듀서
export default handleActions({
    ...pender({
        type: LOAD_BCK_LIST,
        onSuccess: (state, action) => {
            return state.set('bckList',fromJS(action.payload.data));
        },
        onFailure: (state, action) => {
            return state.set('bckList',List([]));
        }
    }),
    [CHANGE_BCK_TOGGLE_MODE] : (state, action) => {
        return state.set('bckToggleMode', action.payload);
    },
}, initialState);