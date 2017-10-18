import React from 'react';
import BoardContainer from 'containers/BoardContainer';
import BckListContainer from 'containers/BucketList/List/BckListContainer';
import BckSaveContainer from 'containers/BucketList/Save/BckSaveContainer';
import BckDetailContainer from 'containers/BucketList/Detail/BckDetailContainer';
import PropertyListContainer from 'containers/Property/List/PropertyListContainer';
import MainHeaderContainer from 'containers/Main/Header/MainHeaderContainer';
import MainListContainer from 'containers/Main/List/MainListContainer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" component={MainHeaderContainer}/>
                    <Route exact path="/" component={MainListContainer}/>
                    <Route path="/board" component={BoardContainer}/>
                    <Route path="/property" component={PropertyListContainer}/>
                    <Route path="/bck/insert" component={BckSaveContainer}/>
                    <Route exact path="/bck" component={BckListContainer}/>
                    <Route path="/bck/insert" component={BckSaveContainer}/>
                    <Route path="/bck/modify/:bckIdx" component={BckSaveContainer}/>
                    <Route path="/bck/detail/:bckIdx" component={BckDetailContainer}/>
                </div>
            </Router>
        </Provider>
    );
}

export default Root;