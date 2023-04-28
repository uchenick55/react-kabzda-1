import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk'; // thunkMiddleWare позволяет диспатчить санки помимо экшенов дл обновления стейта
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import themeReducer from "./theme-reducer";
import feedBackReducer from "./feedback-reducer"
import tasksReducer from "./tasks-reducer";

let reducers = combineReducers({ // объединяем стейт редьюсеров в один объект store
    profilePage: profileReducer, // стейт профиля
    dialogsPage: dialogsReducer, // стейт диалогов
    usersPage: usersReducer, // стейт страницы пользователей
    auth: authReducer, // стейт текущего пользователя
    app: appReducer, // стейт инициализации приложения
    theme: themeReducer, // стейт темы (dark-light)
    feedback: feedBackReducer, // стейт фидбека
    tasks: tasksReducer,// стейт тасков
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunkMiddleWare)
));

type reducersType = typeof reducers
export type GlobalStateType = ReturnType<reducersType> // глобальный тип стейта

//Конструкция, позволяющая автоматически получать общий тип, основываясь на объекте из ActionCreator для каждого редьюсера
type PropertiesTypes<T> = T extends {[ket: string]:infer U} ? U :never
export type InferActionsTypes<T extends {[key: string]: (...args:any[])=>any}> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
window.store = store; // возможность смотреть стор через консоль

export default store
