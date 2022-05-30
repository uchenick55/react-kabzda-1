import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';

let posts = [
    {id: 1, message: "Hi, how are you?", like: "12"},
    {id: 2, message: "it's, my first post", like: "15"},
];

let dialogs = [
    {id: 1, name: "Artem"},
    {id: 2, name: "Misha"},
    {id: 3, name: "Danil"},
    {id: 4, name: "Natasha"},
    {id: 5, name: "Kostya"},
    {id: 6, name: "Zhenya"}
];

let messages = [
    {id: 1, message: "Hello, how are you?"},
    {id: 2, message: "This is my first message!"},
    {id: 3, message: "Did you tell me anything yesterday?"},
    {id: 4, message: "Yo"},
    {id: 5, message: "Yo"}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App postsData={posts} dialogsData={dialogs} messagesData={messages}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
