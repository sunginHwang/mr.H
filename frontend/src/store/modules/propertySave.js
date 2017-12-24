/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { getNextMonthDate } from 'lib/util';
import axiosAuth from 'lib/axiosAuth';
import { Map } from 'immutable';

//액션타입
const CHANGE_INPUT_VALUE = 'propertySave/CHANGE_INPUT_VALUE'
const INITIATE_PROPERTY_INFO = 'propertySave/INITIATE_PROPERTY_INFO';
const INSERT_PROPERTY = 'propertySave/INSERT_PROPERTY';

//비동기 통신

const apiInsertProperty = (propertyType, propertyInfo) => axiosAuth.post(`/api/property/${propertyType}`, propertyInfo);

//액션 생성자
export const insertProperty = createAction(INSERT_PROPERTY,apiInsertProperty);
export const changeInputValue = createAction(CHANGE_INPUT_VALUE);
export const initiatePropertyInfo = createAction(INITIATE_PROPERTY_INFO);

const nextMonthDate = getNextMonthDate();
//초기값
const initialState = Map({
    propertyInfo : Map({
        propertyIdx : -1,
        propertyTitle : '',
        targetAmount : 0,
        completeDate : nextMonthDate,
        monthlyDepositAmount : 0,
        depositType : 0,
    }),
    notifyMessage : ''
});

// 리듀서
export default handleActions({
    ...pender({
        type: INSERT_PROPERTY,
        onSuccess: (state, action) => {
            return state.set('notifyMessage',action.payload.data.successMsg);
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',response.data.errorMsg);
        }
    }),
    [changeInputValue]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.setIn(['propertyInfo',inputType],value);
    },
    [initiatePropertyInfo]: (state, action) => {
        return state.set('propertyInfo',initialState.get('propertyInfo'))
                    .set('notifyMessage',initialState.get('notifyMessage'));
    }
}, initialState);