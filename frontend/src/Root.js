import React from 'react';
import App from 'components/App';
import BoardContainer from 'containers/BoardContainer';
import BlListContainer from 'containers/BucketList/List/BckLstListContainer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" component={BlListContainer}/>
                    <Route path="/board" component={BoardContainer}/>
                </div>
            </Router>
        </Provider>
    );
}

export default Root;