import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

//액션타입
const LOAD_BCK_DETAIL_INFO = 'bckDetail/LOAD_BCK_DETAIL_INFO';
//액션 생성자
export const loadBckDetailInfo = createAction(LOAD_BCK_DETAIL_INFO);

//초기값
const initialState = Map({
    bckDetailInfo : Map({
        bckIdx : -1,
        targetAmount : 0,
        currentAmount : 0,
        completeDate : '1999-01-01',
        regiDate : '1991-02-13',
        bckTitle : '',
        bckDetail : '',
        depositList : List([])
    })
});

// 리듀서
export default handleActions({
    [LOAD_BCK_DETAIL_INFO]: (state, action) => {
        return state.set('bckDetailInfo',fromJS(action.payload));
    },
}, initialState);