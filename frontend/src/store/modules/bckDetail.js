import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import axiosAuth from 'lib/axiosAuth';
import { getErrorMsg } from 'lib/util';

//액션타입
const LOAD_BCK_DETAIL_INFO = 'bckDetail/LOAD_BCK_DETAIL_INFO';
const DELETE_BCK = 'bckDetail/DELETE_BCK';
const SAVE_BCK_DEPOSIT_MONEY = 'bckDetail/SAVE_BCK_DEPOSIT_MONEY';
const CHANGE_BCK_DEPOSIT_MONEY = 'bckDetail/CHANGE_BCK_DEPOSIT_MONEY';
const TOGGLE_BCK_MODAL = 'bckDetail/TOGGLE_BCK_MODAL';

//비동기 호출
export const apiGetBckInfo = (bckIdx) => axiosAuth.get(`/api/bucketList/${bckIdx}`);
export const apiDeleteBck = (bckIdx) => axiosAuth.delete(`/api/bucketList/${bckIdx}`);
export const apiSaveDepositMoney = (targetIdx, typeIdx ,depositAmount) => axiosAuth.post(`/api/deposit/save/${targetIdx}/type/${typeIdx}`,{depositAmount : depositAmount});


//액션 생성자
export const loadBckDetailInfo = createAction(LOAD_BCK_DETAIL_INFO,apiGetBckInfo);
export const saveBckDepositMoney = createAction(SAVE_BCK_DEPOSIT_MONEY,apiSaveDepositMoney);
export const deleteBck = createAction(DELETE_BCK,apiDeleteBck);
export const changeBckDepositMoney = createAction(CHANGE_BCK_DEPOSIT_MONEY);
export const toggleBckModal = createAction(TOGGLE_BCK_MODAL);

//초기값
const initialState = Map({
    bckDepositMoney : '', //  Deposit for bucketListMoney
    notifyMessage : '',
    modal : Map({
        deposit : false,
        delete : false
    }),
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
    }),
    ...pender({
        type: SAVE_BCK_DEPOSIT_MONEY,
        onSuccess: (state, action) => {
            return state.set('notifyMessage',action.payload.data.successMsg);
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',getErrorMsg(response.data.errorMsg));
        }
    }),
    ...pender({
        type: DELETE_BCK,
        onSuccess: (state, action) => {
            return state.set('notifyMessage',action.payload.data.successMsg);
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',getErrorMsg(response.data.errorMsg));
        }
    }),
    [TOGGLE_BCK_MODAL]: (state, action) => {
        return state.updateIn(['modal',action.payload], value => !value);
    },
    [CHANGE_BCK_DEPOSIT_MONEY] : (state, action) =>{
        return state.set('bckDepositMoney', action.payload);
    },
}, initialState);