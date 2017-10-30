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
            propertyTitle : '적금명1번',
            startDate : '2017-06-01',
            completeDate : '2017-08-01',
            targetAmount : 5000000,
            depositType : 2,
            saveMoneyList : List([
                {
                    money : 10000,
                    saveDate : '2017-06-01',
                },
                {
                    money : 10000,
                    saveDate : '2017-05-01',
                },
                {
                    money : 10000,
                    saveDate : '2017-04-01',
                }
            ])
        },
        {
            propertyIdx : 2,
            propertyTitle : '적금명2',
            startDate : '2017-05-01',
            completeDate : '2017-09-11',
            targetAmount : 5000000,
            depositType : 2,
            saveMoneyList : List([
                {
                    money : 20000,
                    saveDate : '2017-06-01',
                },
                {
                    money : 30000,
                    saveDate : '2017-05-01',
                },
                {
                    money : 50000,
                    saveDate : '2017-04-01',
                }
            ])
        },
        {
            propertyIdx : 3,
            propertyTitle : '예금명1',
            startDate : '2017-06-01',
            completeDate : '2017-08-01',
            targetAmount : 2000022,
            depositType : 1,
            saveMoneyList : List([
                {
                    money : 2000022,
                    saveDate : '2017-06-01',
                }
            ])
        },
        {
            propertyIdx : 4,
            propertyTitle : '예금명2',
            startDate : '2017-04-01',
            completeDate : '2018-04-01',
            targetAmount : 4000000,
            depositType : 1,
            saveMoneyList : List([
                {
                    money : 4000000,
                    saveDate : '2017-06-01',
                }
            ])
        }


    ])
});

// 리듀서
export default handleActions({
    [LOAD_PROPERTY_LIST_INFO]: (state, action) => {
        return state.set('propertyMoneyList',fromJS(action.payload));
    },
}, initialState);