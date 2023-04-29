import {getAuthMeThunkCreator} from "./auth-reducer";
import {getThemeThunkCreator} from "./theme-reducer";
import {GlobalStateType, InferActionsTypes} from "./store-redux";
import {ThunkAction} from "redux-thunk";

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения
const APP_INITIAL_STATE = "myApp/app-reducer/APP_INITIAL_STATE"; //константа зануления при логауте
const SET_PATCH = "myApp/app-reducer/SET_PATCH"; //константа задания пути в URL
const SET_PAGE_WIDTH = "myApp/app-reducer/SET_PAGE_WIDTH"; //константа задания ширины окна

export const AppActions = {
    setInitialisedApp: () => { // экшн креатор  инициализации приложения
        return {type: SET_INITIALISED_APP} as const
    },

    appInitialState: () => { // экшн зануления при логауте
        return {type: APP_INITIAL_STATE} as const
    },

    setPatch: (patch: string) => { // экшн зануления при логауте
        return {type: SET_PATCH, patch} as const
    },

    setPageWidth: (PageWidth: number) => { // экшн записи ширины экрана
        return {type: SET_PAGE_WIDTH, PageWidth} as const
    }
}

type AppActionTypes = InferActionsTypes<typeof AppActions>

type initialStateType = typeof initialState

let initialState = { //стейт по умолчанию для инициализации приложения
    initialisedApp: false, // флаг приложение инициализировано?
    patch: "", // название страницы из URL
    PageWidth: document.documentElement.scrollWidth // ширина страницы по умолчанию
}

let appReducer = (state: initialStateType = initialState, action: AppActionTypes): initialStateType => {//редьюсер инициализации приложения
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_INITIALISED_APP: // экшн инициализации приложения
            stateCopy = {
                ...state, // копия всего стейта
                initialisedApp: true, // смена флага инициализации приложения на true
            }
            return stateCopy; // возврат копии стейта после изменения
        case APP_INITIAL_STATE: // экшн зануления при логауте
            stateCopy = initialState
            return stateCopy; // возврат копии стейта после изменения
        case SET_PATCH: // экшн инициализации приложения
            stateCopy = {
                ...state, // копия всего стейта
                patch: action.patch, // смена флага инициализации приложения на true
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_PAGE_WIDTH: // экшн записи ширины экрана
            stateCopy = {
                ...state, // копия всего стейта
                PageWidth: action.PageWidth, // смена флага инициализации приложения на true
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}
type ThunkType = ThunkAction<void,    // санка ничего не возвращает
    GlobalStateType,    // глобальный стейт из redux
    unknown,    // нет доп параметров
    AppActionTypes // все типы ActionCreator
    >
export const initialisedAppThunkCreator = (): ThunkType => {// санкреатор инициализации приложения
    return (dispatch, getState) => { // санки  инициализации приложения
        const promise1 = dispatch( getAuthMeThunkCreator() ) // проверка статуса авторизации
        const promise2 = dispatch( getThemeThunkCreator() ) // получение темы
        Promise.all( [promise1, promise2] ) // если все промисы зарезолвились
            .then( () => {
                dispatch( AppActions.setInitialisedApp() ) // смена флага инициализации на true
            } )
    };
}

export default appReducer;










