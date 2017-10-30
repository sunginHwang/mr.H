import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

//액션타입
const LOAD_PROPERTY_DETAIL_INFO = 'propertyDetail/LOAD_PROPERTY_DETAIL_INFO';
//액션 생성자
export const loadPropertyDetailInfo = createAction(LOAD_PROPERTY_DETAIL_INFO);

//초기값
const initialState = Map({
    propertyDetailInfo : Map({
        propertyIdx : -1,
        propertyTitle : '',
        startDate : '1991-02-13',
        completeDate : '1999-12-31',
        targetAmount : 0,
        depositType : 0,
        saveMoneyList : List([])
    })
});

// 리듀서
export default handleActions({
    [LOAD_PROPERTY_DETAIL_INFO]: (state, action) => {
        return state.set('propertyDetailInfo',fromJS(action.payload));
    },
}, initialState);