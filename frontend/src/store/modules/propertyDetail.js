import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import axiosAuth from 'lib/axiosAuth';

//액션타입
const LOAD_PROPERTY_DETAIL_INFO = 'propertyDetail/LOAD_PROPERTY_DETAIL_INFO';
const TOGGLE_PROPERTY_MODAL = 'propertyDetail/TOGGLE_PROPERTY_MODAL';
const CHANGE_MONTHLY_DEPOSIT_MONEY = 'propertyDetail/CHANGE_MONTHLY_DEPOSIT_MONEY';
const CHANGE_ERROR_MESSAGE = 'propertyDetail/CHANGE_ERROR_MESSAGE';
const SAVE_DEPOSIT_MONEY = 'propertyDetail/SAVE_DEPOSIT_MONEY';
const DELETE_PROPERTY = 'propertyDetail/DELETE_PROPERTY';


//비동기 호출
export const apiGetPropertyInfo = (propertyIdx) => axiosAuth.get(`/api/property/${propertyIdx}`);
export const apiDeleteProperty = (propertyIdx) => axiosAuth.delete(`/api/property/${propertyIdx}`);
export const apiSaveDepositMoney = (targetIdx, typeIdx ,depositAmount) => axiosAuth.post(`/api/deposit/save/${targetIdx}/type/${typeIdx}`,{depositAmount : depositAmount});

//액션 생성자
export const loadPropertyDetailInfo = createAction(LOAD_PROPERTY_DETAIL_INFO,apiGetPropertyInfo);
export const saveDepositMoney = createAction(SAVE_DEPOSIT_MONEY,apiSaveDepositMoney);
export const deleteProperty = createAction(DELETE_PROPERTY,apiDeleteProperty);
export const togglePropertyModal = createAction(TOGGLE_PROPERTY_MODAL);
export const changeMonthlyDepositMoney = createAction(CHANGE_MONTHLY_DEPOSIT_MONEY);
export const changeErrorMessage = createAction(CHANGE_ERROR_MESSAGE);

//초기값
const initialState = Map({
    propertyDetailInfo : Map({
        propertyIdx : -1,
        propertyTitle : '',
        startDate : '1991-02-13',
        completeDate : '1999-12-31',
        targetAmount : 0,
        typeIdx : 0,
        depositLists : List([])
    }),
    monthlyDepositMoney : 0,
    modal : Map({
        deposit : false,
        delete : false
    }),
    error : Map({
        modalErrMsg : ''
    }),
    notifyMessage : ''
});

// 리듀서
export default handleActions({
    ...pender({
        type: LOAD_PROPERTY_DETAIL_INFO,
        onSuccess: (state, action) => {
            return state.set('propertyDetailInfo',fromJS(action.payload.data));
        }
    }),
    ...pender({
        type: SAVE_DEPOSIT_MONEY,
        onSuccess: (state, action) => {
            return state.set('notifyMessage',action.payload.data.successMsg);
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',response.data.errorMsg);
        }
    }),
    ...pender({
        type: DELETE_PROPERTY,
        onSuccess: (state, action) => {
            return state.set('notifyMessage',action.payload.data.successMsg);
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',response.data.errorMsg);
        }
    }),
    [TOGGLE_PROPERTY_MODAL]: (state, action) => {
        return state.updateIn(['modal',action.payload], value => !value);
    },
    [CHANGE_MONTHLY_DEPOSIT_MONEY]: (state, action) => {
        return state.set('monthlyDepositMoney',action.payload);
    },
    [CHANGE_ERROR_MESSAGE]: (state, action) => {
        const { type, value } = action.payload;
        return state.setIn(['error',type],value);
    }
}, initialState);