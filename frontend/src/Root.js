import React from 'react';
import App from 'components/App';
import BoardContainer from 'containers/BoardContainer';
import BckLstListContainer from 'containers/BucketList/List/BckLstListContainer';
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
                    <Route exact path="/bck" component={BckLstListContainer}/>
                    <Route path="/bck/insert" component={BckInsertContainer}/>
                </div>
            </Router>
        </Provider>
    );
}

export default Root;