/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

//액션타입
const CHANGE_USER_INPUT_VALUE = 'user/CHANGE_USER_INPUT_VALUE';
const SET_VALIDATE_ERROR_MESSAGE = 'user/SET_VALIDATE_ERROR_MESSAGE';
const INITIAL_USER_INFO = 'user/INITIAL_USER_INFO';
//액션 생성자
export const changeUserInputValue = createAction(CHANGE_USER_INPUT_VALUE);
export const setValidateErrorMessage = createAction(SET_VALIDATE_ERROR_MESSAGE);
export const initialUserInfo = createAction(INITIAL_USER_INFO);

//초기값
const initialState = Map({
    userId : '',
    userPassword : '',
    userPasswordCheck : '',
    userName : '',
    userEmail : '',
    error : Map({
        validateErrMessage : '',
        saveErrMessage : '저장에 실패하였습니다.'
    })
});

// 리듀서
export default handleActions({
    [changeUserInputValue]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.set(inputType,value);
    },
    [setValidateErrorMessage]: (state, action) => {
        return state.setIn(['error','validateErrMessage'],action.payload);
    },
    [initialUserInfo]: (state, action) => {
        return state.set('userId',initialState.get('userId'))
                    .set('userPassword',initialState.get('userPassword'))
                    .set('userPasswordCheck',initialState.get('userPasswordCheck'))
                    .set('userName',initialState.get('userName'))
                    .set('userEmail',initialState.get('userEmail'))
    }
}, initialState);