import store from "./redux/store-redux"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";

setInterval(()=>{ // ставим повторяющееся действие, которое
  store.dispatch({type: "FAKE_ACTON"}) // дергает стейт раз в секунду
  console.log(store.getState().usersPage.fake) // выводим в консоль значение счетчика дерганья стейта
}, 1000)

const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App store={store} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




