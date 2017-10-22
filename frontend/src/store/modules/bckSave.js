/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

//액션타입
const CHANGE_INPUT_VALUE = 'bckSave/CHANGE_INPUT_VALUE';
const SET_VALIDATE_ERROR_MESSAGE = 'bckSave/SET_VALIDATE_ERROR_MESSAGE';
const GET_BCK_MODIFY_INFO = 'bckSave/GET_BCK_MODIFY_INFO';
const INITIATE_BCK_INFO = 'bckSave/INITIATE_BCK_INFO';
//액션 생성자
export const changeInputValue = createAction(CHANGE_INPUT_VALUE);
export const setValidateErrorMessage = createAction(SET_VALIDATE_ERROR_MESSAGE);
export const getBckModifyInfo = createAction(GET_BCK_MODIFY_INFO);
export const initiateBckInfo = createAction(INITIATE_BCK_INFO);

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
    bckInfo : Map({
        bckIdx : -1,
        targetAmount : '',
        currentAmount : '',
        bckTitle : '',
        bckDetail : '',
        completeDate : nextMonthDate
    }),
    error : Map({
        validateErrMessage : '',
        saveErrMessage : '저장에 실패하였습니다.'
    })
});

// 리듀서
export default handleActions({
    [changeInputValue]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.setIn(['bckInfo',inputType],value);
    },
    [setValidateErrorMessage]: (state, action) => {
        return state.setIn(['error','validateErrMessage'],action.payload);
    },
    [getBckModifyInfo] : (state, action) => {
        const bckInfo = action.payload;
        return state.set('bckInfo',Map(bckInfo));
    }
    ,
    [initiateBckInfo] : (state, action) => {
        return state.set('bckInfo',initialState.get('bckInfo'));
    }
}, initialState);