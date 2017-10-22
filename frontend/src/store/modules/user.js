/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

//액션타입
const CHANGE_LOGIN_INPUT_VALUE = 'user/CHANGE_INPUT_VALUE';
const SET_VALIDATE_ERROR_MESSAGE = 'user/SET_VALIDATE_ERROR_MESSAGE';
const USER_LOGIN = 'user/USER_LOGIN';
const USER_LOGOUT = 'user/USER_LOGOUT';
//액션 생성자
export const changeLoginInputValue = createAction(CHANGE_LOGIN_INPUT_VALUE);
export const setValidateErrorMessage = createAction(SET_VALIDATE_ERROR_MESSAGE);
export const userLogin = createAction(USER_LOGIN);
export const userLogout = createAction(USER_LOGOUT);

//초기값
const initialState = Map({
    userIdx : -1,
    userId : '',
    userPassword : '',
    userName : '',
    userEmail : '',
    error : Map({
        validateErrMessage : '',
        saveErrMessage : '저장에 실패하였습니다.'
    })
});

// 리듀서
export default handleActions({
    [changeLoginInputValue]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.set(inputType,value);
    },
    [setValidateErrorMessage]: (state, action) => {
        return state.setIn(['error','validateErrMessage'],action.payload);
    },
    [userLogin]: (state, action) => {
        const { userIdx, userId, userName, userEmail } = action.payload;
        return state.set('userIdx',userIdx)
                    .set('userId',userId)
                    .set('userName',userName)
                    .set('userEmail',userEmail)
    },
    [userLogout]: (state, action) => {
        return state.set('userIdx',initialState.get('userIdx'))
                    .set('userId',initialState.get('userId'))
                    .set('userName',initialState.get('userName'))
                    .set('userEmail',initialState.get('userEmail'))
    }
}, initialState);