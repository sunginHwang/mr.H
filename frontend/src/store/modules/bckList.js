import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import axios from 'axios';

//액션타입
const CHANGE_BCK_DEPOSIT_MONEY = 'bckList/CHANGE_BCK_DEPOSIT_MONEY';
const CHANGE_BCK_DEPOSIT_IDX = 'bckList/CHANGE_BCK_DEPOSIT_IDX';
const SAVE_BCK_DEPOSIT_MONEY = 'bckList/SAVE_BCK_DEPOSIT_MONEY';
const LOAD_BCK_LIST = 'bckList/LOAD_BCK_LIST';
const CHANGE_BCK_TOGGLE_MODE = 'bckList/CHANGE_BCK_TOGGLE_MODE';
const TOGGLE_BCK_MODAL = 'bckList/TOGGLE_BCK_MODAL';
//서버호출
export const boardTotoServerCall = () => axios.get('/api/board/');
//액션 생성자
export const changeBckDepositMoney = createAction(CHANGE_BCK_DEPOSIT_MONEY);
export const changeBckDepositIdx = createAction(CHANGE_BCK_DEPOSIT_IDX);
export const saveBckDepositMoney = createAction(SAVE_BCK_DEPOSIT_MONEY);
export const loadBckList = createAction(LOAD_BCK_LIST);
export const changeBckToggleMode = createAction(CHANGE_BCK_TOGGLE_MODE);
export const toggleBckModal = createAction(TOGGLE_BCK_MODAL);

//초기값
const initialState = Map({
    bckDepositModal : false,
    bckDeleteModal : false,
    bckDepositMoney : '', //  Deposit for bucketListMoney
    bckDepositIdx : 0, //  Deposit for bucketListMoney
    test : '',
    bckToggleMode : 'proceeding',
    bckList : List([]),
    modal : Map({
        deposit : false,
        delete : false
    })
});

// 리듀서
export default handleActions({
    [LOAD_BCK_LIST]: (state, action) => {
        return state.set('bckList',fromJS(action.payload));
    },
    [TOGGLE_BCK_MODAL]: (state, action) => {
        return state.updateIn(['modal',action.payload], value => !value);
    },
    [CHANGE_BCK_DEPOSIT_MONEY] : (state, action) =>{
        return state.set('bckDepositMoney', action.payload);
    },
    [CHANGE_BCK_DEPOSIT_IDX] : (state, action) =>{
        return state.set('bckDepositIdx', action.payload);
    },
    [SAVE_BCK_DEPOSIT_MONEY] : (state, action) =>{
        return state.set('test', action.payload);
    },
    [CHANGE_BCK_TOGGLE_MODE] : (state, action) => {
        return state.set('bckToggleMode', action.payload);
    },
}, initialState);