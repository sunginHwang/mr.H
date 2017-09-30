import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import axios from 'axios';

//액션타입
const TOGGLE_BCK_DEPOSIT_MODAL = 'bckLstList/TOGGLE_INPUT_MODAL';
const CHANGE_BCK_DEPOSIT_MONEY = 'bckLstList/CHANGE_BCK_DEPOSIT_MONEY';

//서버호출
export const boardTotoServerCall = () => axios.get('/api/board/');
//액션 생성자
export const toggleBckDepositModal = createAction(TOGGLE_BCK_DEPOSIT_MODAL);
export const changeBckDepositMoney = createAction(CHANGE_BCK_DEPOSIT_MONEY);

//초기값
const initialState = Map({
    bckDepositModal : false,
    bckDepositMoney : 0, //  Deposit for bucketListMoney
    bckList : List([
        Map({
            bckIdx : 1,
            targetAmount : '300000',
            currentAmount : '150000',
            completeDate : '2017-08',
            bucketListTitle : '일본여향'
        }),
        Map({
            bckIdx : 2,
            targetAmount : '800000',
            currentAmount : '500000',
            completeDate : '2018-01',
            bucketListTitle : '초합금혼사기'
        }),
        Map({
            bckIdx : 3,
            targetAmount : '100000',
            currentAmount : '30000',
            completeDate : '2017-12',
            bucketListTitle : '넬콘서트예약'
        }),
        Map({
            bckIdx : 4,
            targetAmount : '30000000',
            currentAmount : '1753200',
            completeDate : '2018-08',
            bucketListTitle : '적금넣기'
        }),
        Map({
            bckIdx : 5,
            targetAmount : '300000',
            currentAmount : '150000',
            completeDate : '2017-08',
            bucketListTitle : '일본여행'
        })
    ])
});

// 리듀서
export default handleActions({
    [TOGGLE_BCK_DEPOSIT_MODAL]: (state, action) => {
        return state.set('bckDepositModal', action.payload);
    },
    [CHANGE_BCK_DEPOSIT_MONEY] : (state, action) =>{
        return state.set('bckDepositMoney', action.payload);
    }
}, initialState);