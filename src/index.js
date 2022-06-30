import store from "./redux/store-redux"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import StoreContext from "./StoreContext";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const rerenderEntireTree1 = (state) => {
    root.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <Provider store={store}>
                <App store={store} />
            </Provider>
        </StoreContext.Provider>
    </React.StrictMode>
);
}
rerenderEntireTree1(store.getState());

store.subscribe(() =>{
    let state = store.getState();
    rerenderEntireTree1(state)
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




