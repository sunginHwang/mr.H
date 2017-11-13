/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { getNextMonthDate } from 'lib/util';
import { Map } from 'immutable';

//액션타입
const CHANGE_INPUT_VALUE = 'bckSave/CHANGE_INPUT_VALUE';
const GET_BCK_MODIFY_INFO = 'bckSave/GET_BCK_MODIFY_INFO';
const INITIATE_BCK_INFO = 'bckSave/INITIATE_BCK_INFO';
//액션 생성자
export const changeInputValue = createAction(CHANGE_INPUT_VALUE);
export const getBckModifyInfo = createAction(GET_BCK_MODIFY_INFO);
export const initiateBckInfo = createAction(INITIATE_BCK_INFO);



const nextMonthDate = getNextMonthDate();
//초기값
const initialState = Map({
    bckInfo : Map({
        bckIdx : -1,
        targetAmount : '',
        currentAmount : '',
        bckTitle : '',
        bckDetail : '',
        completeType : 0,
        completeDate : nextMonthDate
    })
});

// 리듀서
export default handleActions({
    [changeInputValue]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.setIn(['bckInfo',inputType],value);
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