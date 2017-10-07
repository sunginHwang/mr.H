/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';

//액션타입
const CHANGE_INPUT_VALUE = 'bckInsert/CHANGE_INPUT_VALUE';
const SET_VALIDATE_ERROR_MESSAGE = 'bckInsert/SET_VALIDATE_ERROR_MESSAGE';
//액션 생성자
export const changeInputValue = createAction(CHANGE_INPUT_VALUE);
export const setValidateErrorMessage = createAction(SET_VALIDATE_ERROR_MESSAGE);

const getNextMonthDate = ()=>{
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth()+2;
    let date = today.getDate();
    month = (month+'').length < 2 ? '0'+month : month;
    date = (date+'').length < 2 ? '0'+date : date;
    return year+'-'+month+'-'+date;
};

const nextMonthDate = getNextMonthDate();
//초기값
const initialState = Map({
    targetAmount : 0,
    currentAmount : 0,
    bckTitle : '',
    bckDetail : '',
    completeDate : nextMonthDate,
    validateErrMessage : '',
    saveErrMessage : '저장에 실패하였습니다.'
});

// 리듀서
export default handleActions({
    [changeInputValue]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.set(inputType,value);
    },
    [setValidateErrorMessage]: (state, action) => {
        return state.set('validateErrMessage',action.payload);
    }
}, initialState);