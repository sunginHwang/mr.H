import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import axios from 'axios';

//액션타입
const TOGGLE_BCK_DEPOSIT_MODAL = 'bckList/TOGGLE_BCK_DEPOSIT_MODAL';
const TOGGLE_BCK_DELETE_MODAL = 'bckList/TOGGLE_BCK_DELETE_MODAL';
const CHANGE_BCK_DEPOSIT_MONEY = 'bckList/CHANGE_BCK_DEPOSIT_MONEY';
const CHANGE_BCK_DEPOSIT_IDX = 'bckList/CHANGE_BCK_DEPOSIT_IDX';
const SAVE_BCK_DEPOSIT_MONEY = 'bckList/SAVE_BCK_DEPOSIT_MONEY';
const LOAD_BCK_LIST = 'bckList/LOAD_BCK_LIST';

//서버호출
export const boardTotoServerCall = () => axios.get('/api/board/');
//액션 생성자
export const toggleBckDepositModal = createAction(TOGGLE_BCK_DEPOSIT_MODAL);
export const toggleBckDeleteModal = createAction(TOGGLE_BCK_DELETE_MODAL);
export const changeBckDepositMoney = createAction(CHANGE_BCK_DEPOSIT_MONEY);
export const changeBckDepositIdx = createAction(CHANGE_BCK_DEPOSIT_IDX);
export const saveBckDepositMoney = createAction(SAVE_BCK_DEPOSIT_MONEY);
export const loadBckList = createAction(LOAD_BCK_LIST);

//초기값
const initialState = Map({
    bckDepositModal : false,
    bckDeleteModal : false,
    bckDepositMoney : '', //  Deposit for bucketListMoney
    bckDepositIdx : 0, //  Deposit for bucketListMoney
    test : '',
    bckList : List([])
});

// 리듀서
export default handleActions({
    [LOAD_BCK_LIST]: (state, action) => {
        console.log(action.payload);
        return state.set('bckList',fromJS(action.payload));
    },
    [TOGGLE_BCK_DEPOSIT_MODAL]: (state, action) => {
        return state.set('bckDepositModal', action.payload);
    },
    [TOGGLE_BCK_DELETE_MODAL]: (state, action) => {
        return state.set('bckDeleteModal', action.payload);
    },
    [CHANGE_BCK_DEPOSIT_MONEY] : (state, action) =>{
        return state.set('bckDepositMoney', action.payload);
    },
    [CHANGE_BCK_DEPOSIT_IDX] : (state, action) =>{
        return state.set('bckDepositIdx', action.payload);
    },
    [SAVE_BCK_DEPOSIT_MONEY] : (state, action) =>{
        return state.set('test', action.payload);
    }
}, initialState);