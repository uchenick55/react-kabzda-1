import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk'; // thunkMiddleWare позволяет диспатчить санки помимо экшенов дл обновления стейта
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import darkLightReducer from "./dark-light-reducer";

let reducers = combineReducers({ // объединяем стейт редьюсеров в один объект store
    profilePage: profileReducer, // стейт профиля
    dialogsPage: dialogsReducer, // стейт диалогов
    sideBar: sidebarReducer, // стейт сайдбара
    usersPage: usersReducer, // стейт страницы пользователей
    auth: authReducer, // стейт текущего пользователя
    form: formReducer, // стейт от redux-form
    app: appReducer, // стейт инициализации приложения
    theme: darkLightReducer // стейт темы (dark-light)
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));//ApplyMiddleWare позволяет сделать прослойку между UI и редьюсером, чтобы можно было диспатчить не только экшены, но и санки.
window.store = store; // возможность смотреть стор через консоль

export let bedug_mode = store.getState().app.bedug_mode

export default store
