import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import axios from 'axios';

//액션타입
const GET_BOARD_TODO = 'BOARD_TODO';

//서버호출
export const boardTotoServerCall = () => axios.get('/api/board/');
//액션 생성자
export const boardTodo = createAction(GET_BOARD_TODO,boardTotoServerCall);

//초기값
const initialState = Map({
    author: 'none',
    error : ''
});

// 리듀서
export default handleActions({
    ...pender({
        type: GET_BOARD_TODO,
        onSuccess: (state, action) => {
            const { author } = action.payload.data;
            console.log(author);
            return state.set('author', author);
        },
        onFailure: (state, action) => {
            const { error } = action.payload;
            return state.set('error',error)
        }
    })
}, initialState);