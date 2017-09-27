import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import {AppContainer} from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'store/configure';

const rootEl = document.getElementById('root');
const store = configureStore();

const render = (Component) => ReactDOM.render(
    <AppContainer>
        <Component store={store}/>
    </AppContainer>,
    rootEl
);

render(Root);

if (module.hot) {
    module.hot.accept('./Root', () => render(Root))
}

registerServiceWorker();
