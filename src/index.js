import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
    clientList: '',
    clientSearch: '',
    clientPicked: ''
};

function clientlist(state = initialState, action) {
    if (action.type === 'LIST_DOWNLOAD') {
        return {
            ...state,
            clientList: action.payload,
            clientSearch: action.payload
        }
    }
    if (action.type === 'LIST_UPDATE') {
        return {
            ...state,
            clientSearch: action.payload
        }
    }
    if (action.type === 'CLIENT_PICKED') {
        return {
            ...state,
            clientPicked: action.payload
        }
    }
    return state
}

const store = createStore(clientlist, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log('subscribe', store.getState())
})

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();