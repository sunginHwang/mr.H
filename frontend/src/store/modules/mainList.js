import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import axiosAuth from 'lib/axiosAuth';
import {pender} from "redux-pender";
import { getErrorMsg } from 'lib/util';

//비동기 호출
export const apiGetBckModifyInfo = () => axiosAuth.get('/proxy/api/main/mainInfo');

//액션타입
const LOAD_MAIN_LIST_INFO = 'mainList/LOAD_MAIN_LIST_INFO';
//액션 생성자
export const loadMainListInfo = createAction(LOAD_MAIN_LIST_INFO,apiGetBckModifyInfo);

//초기값
const initialState = Map({
    propertyList : List([]),
    bckList : List([]),
    propertyMoneyList : List([]),
    currentLowAmount : List([])
});

// 리듀서
export default handleActions({
    ...pender({
        type: LOAD_MAIN_LIST_INFO,
        onSuccess: (state, action) => {
            return state.set('propertyList',fromJS(action.payload.data.propertyList))
                        .set('bckList',fromJS(action.payload.data.bckList))
                        .set('propertyMoneyList',fromJS(action.payload.data.propertyStatus))
                        .set('currentLowAmount',fromJS(action.payload.data.currentLowAmount));
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',getErrorMsg(response.data.errorMsg));
        }
    }),
}, initialState);
