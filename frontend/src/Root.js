import React from 'react';
import BckListContainer from 'containers/BucketList/List/BckListContainer';
import BckSaveContainer from 'containers/BucketList/Save/BckSaveContainer';
import BckDetailContainer from 'containers/BucketList/Detail/BckDetailContainer';
import PropertyListContainer from 'containers/Property/List/PropertyListContainer';
import PropertySave from 'containers/Property/Save/PropertySaveContainer';
import PropertyDetailContainer from 'containers/Property/Detail/PropertyDetailContainer';
import MainHeaderContainer from 'containers/Main/Header/MainHeaderContainer';
import MainListContainer from 'containers/Main/List/MainListContainer';
import UserLoginContainer from 'containers/User/Login/UserLoginContainer';
import UserInfoLoadContainer from 'containers/User/Login/UserInfoLoadContainer';
import UserRegisterContainer from 'containers/User/Register/UserRegisterContainer';
import WithAuthCheck from 'hoc/WithAuthCheck';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <UserInfoLoadContainer/>
                    <Route path="/" component={MainHeaderContainer}/>
                    <Route exact path="/" component={MainListContainer}/>
                    {/*유저 정보*/}
                    <Route path="/login" component={UserLoginContainer}/>
                    <Route path="/user/register" component={UserRegisterContainer}/>
                    {/*예금, 적금 */}
                    <Route exact path="/property" component={WithAuthCheck(PropertyListContainer)}/>
                    <Route path="/property/insert" component={WithAuthCheck(PropertySave)}/>
                    <Route path="/property/detail/:propertyIdx" component={WithAuthCheck(PropertyDetailContainer)}/>
                    {/*버킷리스트*/}
                    <Route exact path="/bck" component={WithAuthCheck(BckListContainer)}/>
                    <Route path="/bck/insert" component={WithAuthCheck(BckSaveContainer)}/>
                    <Route path="/bck/modify/:bckIdx" component={WithAuthCheck(BckSaveContainer)}/>
                    <Route path="/bck/detail/:bckIdx" component={WithAuthCheck(BckDetailContainer)}/>
                </div>
            </Router>
        </Provider>
    )
};

export default Root;