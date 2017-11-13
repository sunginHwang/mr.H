/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { getNextMonthDate } from 'lib/util';
import { Map } from 'immutable';

//액션타입
const CHANGE_INPUT_VALUE = 'propertySave/CHANGE_INPUT_VALUE'
const INITIATE_PROPERTY_INFO = 'propertySave/INITIATE_PROPERTY_INFO';
//액션 생성자
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
    })
});

// 리듀서
export default handleActions({
    [changeInputValue]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.setIn(['propertyInfo',inputType],value);
    },
    [initiatePropertyInfo]: (state, action) => {
        return state.set('propertyInfo',initialState.get('propertyInfo'));
    }
}, initialState);