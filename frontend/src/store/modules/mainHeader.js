/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

//액션타입
const TOGGLE_SIDE_MENU = 'mainHeader/TOGGLE_SIDE_MENU';
//액션 생성자
export const toggleSideMenu = createAction(TOGGLE_SIDE_MENU);

//초기값
const initialState = Map({
    sideMenuVisible : false
});

// 리듀서
export default handleActions({
    [toggleSideMenu] : (state, action) => {
        const visible = state.get('sideMenuVisible');
        return state.set('sideMenuVisible',!visible);
    }
}, initialState);