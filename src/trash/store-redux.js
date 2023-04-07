import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk'; // thunkMiddleWare позволяет диспатчить санки помимо экшенов дл обновления стейта
import profileReducer from "../redux/profile-reducer.js";
import dialogsReducer from "../redux/dialogs-reducer.js";
import sidebarReducer from "../redux/sidebar-reducer.js";
import usersReducer from "../redux/users-reducer.js";
import authReducer from "../redux/auth-reducer.js";
import appReducer from "../redux/app-reducer.js";
import themeReducer from "../redux/theme-reducer.js";
import feedBackReducer from "../redux/feedback-reducer.js"

let reducers = combineReducers({ // объединяем стейт редьюсеров в один объект store
    profilePage: profileReducer, // стейт профиля
    dialogsPage: dialogsReducer, // стейт диалогов
    sideBar: sidebarReducer, // стейт сайдбара
    usersPage: usersReducer, // стейт страницы пользователей
    auth: authReducer, // стейт текущего пользователя
    app: appReducer, // стейт инициализации приложения
    theme: themeReducer, // стейт темы (dark-light)
    feedback: feedBackReducer, // стейт фидбека
});

//let store = createStore(reducers, applyMiddleware(thunkMiddleWare));//ApplyMiddleWare позволяет сделать прослойку между UI и редьюсером, чтобы можно было диспатчить не только экшены, но и санки.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunkMiddleWare)
));

window.store = store; // возможность смотреть стор через консоль

export default store
