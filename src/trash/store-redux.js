import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk'; // thunkMiddleWare позволяет диспатчить санки помимо экшенов дл обновления стейта
<<<<<<< HEAD:src/trash/store-redux.js
import profileReducer from "../redux/profile-reducer.js";
import dialogsReducer from "../redux/dialogs-reducer.js";
import sidebarReducer from "../redux/sidebar-reducer.js";
import usersReducer from "../redux/users-reducer.js";
import authReducer from "../redux/auth-reducer.js";
import appReducer from "../redux/app-reducer.js";
import themeReducer from "../redux/theme-reducer.js";
import feedBackReducer from "../redux/feedback-reducer.js"
=======
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import sidebarReducer from "./sidebar-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import appReducer from "./app-reducer.ts";
import themeReducer from "./theme-reducer.ts";
import feedBackReducer from "./feedback-reducer.ts"
import tasksReducer from "./tasks-reducer";
>>>>>>> 7e910cc0633730a5452b38fa29dbad7712988a48:src/redux/store-redux.js

let reducers = combineReducers({ // объединяем стейт редьюсеров в один объект store
    profilePage: profileReducer, // стейт профиля
    dialogsPage: dialogsReducer, // стейт диалогов
    sideBar: sidebarReducer, // стейт сайдбара
    usersPage: usersReducer, // стейт страницы пользователей
    auth: authReducer, // стейт текущего пользователя
    app: appReducer, // стейт инициализации приложения
    theme: themeReducer, // стейт темы (dark-light)
    feedback: feedBackReducer, // стейт фидбека
    tasks: tasksReducer // стейт Tasks
});

//let store = createStore(reducers, applyMiddleware(thunkMiddleWare));//ApplyMiddleWare позволяет сделать прослойку между UI и редьюсером, чтобы можно было диспатчить не только экшены, но и санки.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunkMiddleWare)
));

window.store = store; // возможность смотреть стор через консоль

export default store
