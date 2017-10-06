import React from 'react';
import BoardContainer from 'containers/BoardContainer';
import BckListContainer from 'containers/BucketList/List/BckListContainer';
import BckInsertContainer from 'containers/BucketList/Insert/BckInsertContainer';
import MainContainer from 'containers/Main/MainContainer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" component={MainContainer}/>
                    <Route path="/board" component={BoardContainer}/>
                    <Route exact path="/bck" component={BckListContainer}/>
                    <Route path="/bck/insert" component={BckInsertContainer}/>
                </div>
            </Router>
        </Provider>
    );
}

export default Root;