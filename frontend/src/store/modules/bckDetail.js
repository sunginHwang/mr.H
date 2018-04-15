import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import axiosAuth from 'lib/axiosAuth';
import { getErrorMsg } from 'lib/util';

//액션타입
const LOAD_BCK_DETAIL_INFO = 'bckDetail/LOAD_BCK_DETAIL_INFO';

//비동기 호출
export const apiGetBckInfo = (bckIdx) => axiosAuth.get(`/api/bucketList/${bckIdx}`);

//액션 생성자
export const loadBckDetailInfo = createAction(LOAD_BCK_DETAIL_INFO,apiGetBckInfo);

//초기값
const initialState = Map({
    bckDetailInfo : Map({
        bckIdx : -1,
        targetAmount : 0,
        completeDate : '1999-01-01',
        startDate : '1991-02-13',
        typeIdx : 0,
        notifyMessage: '',
        bckTitle : '',
        bckDetail : '',
        depositLists : List([])
    })
});

// 리듀서
export default handleActions({
    ...pender({
        type: LOAD_BCK_DETAIL_INFO,
        onSuccess: (state, action) => {
            return state.set('bckDetailInfo',fromJS(action.payload.data));
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',getErrorMsg(response.data.errorMsg));
        }
    })
}, initialState);