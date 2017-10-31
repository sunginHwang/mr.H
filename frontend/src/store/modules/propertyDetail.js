import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

//액션타입
const LOAD_PROPERTY_DETAIL_INFO = 'propertyDetail/LOAD_PROPERTY_DETAIL_INFO';
const TOGGLE_PROPERTY_MODAL = 'propertyDetail/TOGGLE_PROPERTY_MODAL';
const CHANGE_MONTHLY_DEPOSIT_MONEY = 'propertyDetail/CHANGE_MONTHLY_DEPOSIT_MONEY';

//액션 생성자
export const loadPropertyDetailInfo = createAction(LOAD_PROPERTY_DETAIL_INFO);
export const togglePropertyModal = createAction(TOGGLE_PROPERTY_MODAL);
export const changeMonthlyDepositMoney = createAction(CHANGE_MONTHLY_DEPOSIT_MONEY);

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
    }),
    monthlyDepositMoney : 0,
    modal : Map({
        deposit : false,
        delete : false
    })
});

// 리듀서
export default handleActions({
    [LOAD_PROPERTY_DETAIL_INFO]: (state, action) => {
        return state.set('propertyDetailInfo',fromJS(action.payload));
    },
    [TOGGLE_PROPERTY_MODAL]: (state, action) => {
        return state.updateIn(['modal',action.payload], value => !value);
    },
    [CHANGE_MONTHLY_DEPOSIT_MONEY]: (state, action) => {
        return state.set('monthlyDepositMoney',action.payload);
    }
}, initialState);