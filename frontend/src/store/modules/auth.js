/**
 * Created by hwangseong-in on 2017. 10. 6..
 */
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';
import axiosAuth from 'lib/axiosAuth';


//액션타입
const CHANGE_LOGIN_INPUT_VALUE = 'auth/CHANGE_LOGIN_INPUT_VALUE';
const USER_LOGIN = 'auth/USER_LOGIN';
const INITIAL_AUTH_USER = 'auth/INITIAL_AUTH_USER';
const LOAD_USER_INFO = 'auth/LOAD_USER_INFO';

//비동기호출
export const apiUSerLogin = (id, password) => axiosAuth.get(`/api/auth/login?id=${id}&password=${password}`);
export const apiLoadUserInfo = (token) => axiosAuth.get(`/api/auth/loadUserInfo?accessToken=${token}`);

//액션 생성자
export const changeLoginInputValue = createAction(CHANGE_LOGIN_INPUT_VALUE);
export const userLogin = createAction(USER_LOGIN,apiUSerLogin);
export const loadUserInfo = createAction(LOAD_USER_INFO,apiLoadUserInfo);
export const initialAuthUser = createAction(INITIAL_AUTH_USER);

//초기값
const initialState = Map({
    user: Map({
        userIdx : -1,
        userId : '',
        userPassword : '',
        userName : ''
    }),
    accessToken : '',
    notifyMessage : ''
});

// 리듀서
export default handleActions({
    ...pender({
        type: USER_LOGIN,
        onSuccess: (state, action) => {

            axiosAuth.defaults.headers.common['mrh-user-token'] = action.payload.data.accessToken;

            return state.setIn(['user','userIdx'],action.payload.data.userInfo.userIdx)
                        .setIn(['user','userId'],action.payload.data.userInfo.userId)
                        .setIn(['user','userName'],action.payload.data.userInfo.userName)
                        .set('accessToken',action.payload.data.accessToken);
        },
        onFailure: (state, action) => {
            const { response } = action.payload;
            return state.set('notifyMessage',response.data.errorMsg);
        }
    }),
    ...pender({
        type: LOAD_USER_INFO,
        onSuccess: (state, action) => {
            return state.setIn(['user','userIdx'],action.payload.data.userInfo.userIdx)
                        .setIn(['user','userId'],action.payload.data.userInfo.userId)
                        .setIn(['user','userName'],action.payload.data.userInfo.userName)
                        .set('accessToken',action.payload.data.accessToken);
        }
    }),
    [changeLoginInputValue]: (state, action) => {
        const {inputType, value} = action.payload;
        return state.setIn(['user',inputType],value);
    },
    [initialAuthUser]: (state, action) => {

        axiosAuth.defaults.headers.common['mrh-user-token'] = null;

        return state.setIn(['user','userIdx'],initialState.getIn(['user','userIdx']))
                    .setIn(['user','userId'],initialState.getIn(['user','userId']))
                    .setIn(['user','userName'],initialState.getIn(['user','userName']))
                    .setIn(['user','userPassword'],initialState.getIn(['user','userPassword']))
                    .set('accessToken',initialState.get('accessToken'))
                    .set('notifyMessage',initialState.get('notifyMessage'));
    }
}, initialState);