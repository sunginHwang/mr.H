import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

//액션타입
const LOAD_PROPERTY_LIST_INFO = 'mainList/LOAD_BCK_DETAIL_INFO';
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
    ]),
    propertyMoneyList : List([
        {
            date : '2017-02',
            totalMoney : 30000
        },
        {
            date : '2017-03',
            totalMoney : 40000
        },
        {
            date : '2017-04',
            totalMoney : 33000
        },
        {
            date : '2017-05',
            totalMoney : 50000
        },
        {
            date : '2017-06',
            totalMoney : 80000
        }
    ])
});

// 리듀서
export default handleActions({
    [LOAD_PROPERTY_LIST_INFO]: (state, action) => {
        return state.set('propertyMoneyList',fromJS(action.payload));
    },
}, initialState);