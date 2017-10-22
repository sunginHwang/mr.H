import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

//액션타입
const LOAD_PROPERTY_LIST_INFO = 'propertyList/LOAD_BCK_DETAIL_INFO';
//액션 생성자
export const loadPropertyList = createAction(LOAD_PROPERTY_LIST_INFO);

//초기값
const initialState = Map({
    propertyList : List([
        {
            propertyIdx : 1,
            propertyStartDate : '2017-06-01',
            propertyTitle : '적금명',
            propertyEndDate : '2017-08-01',
            propertyTargetAmount : 20000,
            propertyCurrentAmount : 10000,
        },
        {
            propertyIdx : 2,
            propertyStartDate : '2017-06-01',
            propertyTitle : '적금명2',
            propertyEndDate : '2017-08-01',
            propertyTargetAmount : 20000,
            propertyCurrentAmount : 10000,
        },
        {
            propertyIdx : 3,
            propertyStartDate : '2017-06-01',
            propertyTitle : '적금명3',
            propertyEndDate : '2017-08-01',
            propertyTargetAmount : 20000,
            propertyCurrentAmount : 10000,
        }
    ])
});

// 리듀서
export default handleActions({
    [LOAD_PROPERTY_LIST_INFO]: (state, action) => {
        return state.set('propertyMoneyList',fromJS(action.payload));
    },
}, initialState);