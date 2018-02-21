import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import axiosAuth from 'lib/axiosAuth';
import { getErrorMsg } from 'lib/util';


//액션타입
const CHANGE_BCK_DEPOSIT_MONEY = 'bckList/CHANGE_BCK_DEPOSIT_MONEY';
const CHANGE_BCK_DEPOSIT_IDX = 'bckList/CHANGE_BCK_DEPOSIT_IDX';
const SAVE_BCK_DEPOSIT_MONEY = 'bckList/SAVE_BCK_DEPOSIT_MONEY';
const LOAD_BCK_LIST = 'bckList/LOAD_BCK_LIST';
const CHANGE_BCK_TOGGLE_MODE = 'bckList/CHANGE_BCK_TOGGLE_MODE';
const TOGGLE_BCK_MODAL = 'bckList/TOGGLE_BCK_MODAL';
const DELETE_BCK = 'bckList/DELETE_BCK';
//서버호출
export const apiGetList = () => axiosAuth.get('/api/bucketList/list');
export const apiDeleteBck = (bckIdx) => axiosAuth.delete(`/api/bucketList/${bckIdx}`);
export const apiSaveDepositMoney = (targetIdx, typeIdx ,depositAmount) => axiosAuth.post(`/api/deposit/save/${targetIdx}/type/${typeIdx}`,{depositAmount : depositAmount});

//액션 생성자
export const loadBckList = createAction(LOAD_BCK_LIST,apiGetList);
export const saveBckDepositMoney = createAction(SAVE_BCK_DEPOSIT_MONEY,apiSaveDepositMoney);
export const deleteBck = createAction(DELETE_BCK,apiDeleteBck);
export const changeBckDepositMoney = createAction(CHANGE_BCK_DEPOSIT_MONEY);
export const changeBckDepositIdx = createAction(CHANGE_BCK_DEPOSIT_IDX);
export const changeBckToggleMode = createAction(CHANGE_BCK_TOGGLE_MODE);
export const toggleBckModal = createAction(TOGGLE_BCK_MODAL);

//초기값
const initialState = Map({
    bckDepositMoney : '', //  Deposit for bucketListMoney
    bckDepositIdx : 0, //  Deposit for bucketListMoney
    notifyMessage : '',
    bckToggleMode : 'proceeding',
    bckList : List([]),
    modal : Map({
        deposit : false,
        delete : false
    })
});

// 리듀서
export default handleActions({
    ...pender({
        type: LOAD_BCK_LIST,
        onSuccess: (state, action) => {
            return state.set('bckList',fromJS(action.payload.data));
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
    [CHANGE_BCK_DEPOSIT_IDX] : (state, action) =>{
        return state.set('bckDepositIdx', action.payload);
    },
    [CHANGE_BCK_TOGGLE_MODE] : (state, action) => {
        return state.set('bckToggleMode', action.payload);
    },
}, initialState);