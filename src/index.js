import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { fetchReplayData } from './actions/actionCreators';

//store.dispatch(fetchReplayData());

console.log("Render from index")
ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, 
    
document.getElementById('root'));
serviceWorker.unregister();
