import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import axios from 'axios';

//액션타입
const TOGGLE_BCK_DEPOSIT_MODAL = 'bckLstList/TOGGLE_INPUT_MODAL';

//서버호출
export const boardTotoServerCall = () => axios.get('/api/board/');
//액션 생성자
export const toggleBckDepositModal = createAction(TOGGLE_BCK_DEPOSIT_MODAL);

//초기값
const initialState = Map({
    bckDepositModal : false
});

// 리듀서
export default handleActions({
    [TOGGLE_BCK_DEPOSIT_MODAL]: (state, action) => {
        console.log(action);
        return state.set('bckDepositModal', action.payload);
    }
}, initialState);