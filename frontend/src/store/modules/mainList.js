import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

//액션타입
const LOAD_PROPERTY_LIST_INFO = 'mainList/LOAD_BCK_DETAIL_INFO';
//액션 생성자
export const loadPropertyList = createAction(LOAD_PROPERTY_LIST_INFO);

//초기값
const initialState = Map({
    propertyList : List([
        {
            propertyIdx : 1,
            propertyTitle : '적금명1',
            startDate : '2017-06-01',
            completeDate : '2019-08-01',
            depositType : 2
        },
        {
            propertyIdx : 2,
            propertyTitle : '예금명2',
            startDate : '2017-04-01',
            completeDate : '2018-11-01',
            depositType : 1
        }
    ]),
    bucketList : List([
        {
            bckIdx : 1,
            targetAmount : 0,
            currentAmount : 0,
            startDate : '2017-04-13',
            completeDate : '2017-08-15',
            completeType : 3,
            bckTitle : '일본기간완료'
        },
        {
            bckIdx : 2,
            targetAmount : 800000,
            currentAmount : 500000,
            startDate : '2017-01-13',
            completeDate : '2018-01-01',
            completeType : 4,
            bckTitle : '초합금혼돈진행'
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