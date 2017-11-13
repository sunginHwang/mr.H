/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

//액션타입
const CHANGE_LOGIN_INPUT_VALUE = 'auth/CHANGE_LOGIN_INPUT_VALUE';
const USER_LOGIN = 'auth/USER_LOGIN';
const INITIAL_AUTH_USER = 'auth/INITIAL_AUTH_USER';
//액션 생성자
export const changeLoginInputValue = createAction(CHANGE_LOGIN_INPUT_VALUE);
export const userLogin = createAction(USER_LOGIN);
export const initialAuthUser = createAction(INITIAL_AUTH_USER);

//초기값
const initialState = Map({
    user: Map({
        userIdx : -1,
        userId : '',
        userPassword : '',
        userName : ''
    })
});

// 리듀서
export default handleActions({
    [changeLoginInputValue]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.setIn(['user',inputType],value);
    },
    [userLogin]: (state, action) => {
        const { userIdx, userId, userName } = action.payload;
        return state.setIn(['user','userIdx'],userIdx)
                    .setIn(['user','userId'],userId)
                    .setIn(['user','userName'],userName)
    },
    [initialAuthUser]: (state, action) => {
        return state.setIn(['user','userIdx'],initialState.getIn(['user','userIdx']))
                    .setIn(['user','userId'],initialState.getIn(['user','userId']))
                    .setIn(['user','userName'],initialState.getIn(['user','userName']))
                    .setIn(['user','userPassword'],initialState.getIn(['user','userPassword']))
    }
}, initialState);