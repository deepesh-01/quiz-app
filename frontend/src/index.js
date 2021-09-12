import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer,compose(applyMiddleware(thunk)));

ReactDOM.render(

    <Provider store = {store}>
      <App />
    </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();