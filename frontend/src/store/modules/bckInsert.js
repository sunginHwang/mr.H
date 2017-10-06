/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';

//액션타입
const TOGGLE_BCK_DEPOSIT_MODAL1 = 'bckLstList/TOGGLE_BCK_DEPOSIT_MODAL';

//액션 생성자
export const dd12 = createAction(TOGGLE_BCK_DEPOSIT_MODAL1);

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
    completeDate : nextMonthDate
});

// 리듀서
export default handleActions({
    [dd12]: (state, action) => {
        console.log(action.payload);
        return state.set('bckTitle',fromJS(action.payload));
    }
}, initialState);