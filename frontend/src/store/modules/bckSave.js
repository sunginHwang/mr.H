/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { getNextMonthDate } from 'lib/util';
import { Map, fromJS } from 'immutable';
import axiosAuth from 'lib/axiosAuth';
import { getErrorMsg } from 'lib/util';


//액션타입
const CHANGE_INPUT_VALUE = 'bckSave/CHANGE_INPUT_VALUE';
const GET_BCK_MODIFY_INFO = 'bckSave/GET_BCK_MODIFY_INFO';
const CHANGE_FIRST_DEPOSIT = 'bckSave/CHANGE_FIRST_DEPOSIT'
const INITIATE_BCK_INFO = 'bckSave/INITIATE_BCK_INFO';
const MODIFY_BCK_INFO = 'bckSave/MODIFY_BCK_INFO';
const INSERT_BCK_INFO = 'bckSave/INSERT_BCK_INFO';

//비동기 호출
export const apiGetBckModifyInfo = (bckIdx) => axiosAuth.get(`/api/bucketList/${bckIdx}`);
export const apiModifyBck = (bckIdx, bckInfo) => axiosAuth.put(`/api/bucketList/${bckIdx}`, bckInfo);
export const apiInsertBck = (typeIdx, bckInfo, currentAmount) => axiosAuth.post(`/api/bucketList/${typeIdx}`, {bckInfo, currentAmount});

//액션 생성자
export const getBckModifyInfo = createAction(GET_BCK_MODIFY_INFO,apiGetBckModifyInfo);
export const modifyBckInfo  = createAction(MODIFY_BCK_INFO,apiModifyBck);
export const insertBckInfo  = createAction(INSERT_BCK_INFO,apiInsertBck);
export const changeFirstDeposit = createAction(CHANGE_FIRST_DEPOSIT);
export const changeInputValue = createAction(CHANGE_INPUT_VALUE);
export const initiateBckInfo = createAction(INITIATE_BCK_INFO);

const nextMonthDate = getNextMonthDate();
//초기값
const initialState = Map({
    bckInfo : Map({
        bckIdx : -1,
        targetAmount : 0,
        bckTitle : '',
        bckDetail : '',
        typeIdx : 0,
        completeDate : nextMonthDate
    }),
    notifyMessage : '',
    currentAmount : 0,
});

// 리듀서
export default handleActions({
    ...pender({
        type: GET_BCK_MODIFY_INFO,
        onSuccess: (state, action) => {
            const bckInfo = fromJS(action.payload.data).toJS();
            return state.setIn(['bckInfo','bckIdx'],bckInfo.bckIdx)
                        .setIn(['bckInfo','targetAmount'],bckInfo.targetAmount)
                        .setIn(['bckInfo','bckTitle'],bckInfo.bckTitle)
                        .setIn(['bckInfo','bckDetail'],bckInfo.bckDetail)
                        .setIn(['bckInfo','completeDate'],bckInfo.completeDate)
                        .setIn(['bckInfo','typeIdx'],bckInfo.typeIdx);
        }
    }),
    ...pender({
        type: MODIFY_BCK_INFO,
        onSuccess: (state, action) => {
            return state.set('notifyMessage',action.payload.data.successMsg);
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',getErrorMsg(response.data.errorMsg));
        }
    }),
    ...pender({
        type: INSERT_BCK_INFO,
        onSuccess: (state, action) => {
            return state.set('notifyMessage',action.payload.data.successMsg);
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',getErrorMsg(response.data.errorMsg));
        }
    }),
    [CHANGE_INPUT_VALUE]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.setIn(['bckInfo',inputType],value);
    },
    [CHANGE_FIRST_DEPOSIT]: (state, action) => {
        return state.set('currentAmount',action.payload);
    },
    [INITIATE_BCK_INFO] : (state, action) => {
        return state.set('bckInfo',initialState.get('bckInfo'));
    }
}, initialState);