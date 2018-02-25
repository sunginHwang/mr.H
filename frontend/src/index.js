import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import {AppContainer} from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'store/configure';
import axiosAuth from 'lib/axiosAuth';
import './style/main.css';

const rootEl = document.getElementById('root');
const isProd = process.env.NODE_ENV === 'production';

if(isProd){
    axiosAuth.defaults.withCredentials = true;
    axiosAuth.defaults.baseURL = 'http://mrh.kr:2000';
}

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
