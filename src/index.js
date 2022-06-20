import store from "./redux/state"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const rerenderEntireTree1 = (state) => {

    root.render(
    <React.StrictMode>
    <App
        state={state}
        dispatch={store.dispatch.bind(store)}
        />
    </React.StrictMode>
);

}
/*debugger*/
rerenderEntireTree1(store.getState());
/*debugger*/
store.subscribe(rerenderEntireTree1);
/*debugger*/


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




