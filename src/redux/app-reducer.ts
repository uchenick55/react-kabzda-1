import {getAuthMeThunkCreator} from "./auth-reducer";
import {getThemeThunkCreator} from "./theme-reducer";
import { InferActionsTypes} from "./store-redux";
import {ComThunkTp, NotifyType, ErrorType} from "../components/common/types/commonTypes";

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения
const APP_INITIAL_STATE = "myApp/app-reducer/APP_INITIAL_STATE"; //константа зануления при логауте
const SET_PATCH = "myApp/app-reducer/SET_PATCH"; //константа задания пути в URL
const SET_PAGE_WIDTH = "myApp/app-reducer/SET_PAGE_WIDTH"; //константа задания ширины окна
const TOGGLE_IS_FETCHING = "myApp/users-reducer/TOGGLE_IS_FETCHING";
const SET_ERROR_GLOBAL = "myApp/users-reducer/SET_ERROR_GLOBAL";// задать глобальные ошибки с сервера (все кроме 200 ответа)
const SET_ERROR_200 = "myApp/users-reducer/SET_ERROR_200";// задать ошибки с сервера (в ответе 200)
const SET_ERROR_200_ARCHIVE = "myApp/users-reducer/SET_ERROR_200_ARCHIVE";// задать архив ошибок с сервера (в ответе 200)

export const appActions = {
    setInitialisedApp: () => { // экшн креатор  инициализации приложения
        return {type: SET_INITIALISED_APP} as const
    },

    appInitialState: () => { // экшн зануления при логауте
        return {type: APP_INITIAL_STATE} as const
    },

    setPatch: (patch: string) => { // экшн зануления при логауте
        return {type: SET_PATCH, patch} as const
    },

    setPageWidth: (pageWidth: number) => { // экшн записи ширины экрана
        return {type: SET_PAGE_WIDTH, pageWidth} as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return {type: TOGGLE_IS_FETCHING, isFetching} as const
    },
    setAppErrorAC: (errorGlobal: ErrorType) => { // глобальные ошибки (все кроме 200 ответа)
        return {type: SET_ERROR_GLOBAL, errorGlobal} as const
    },
    setNotify: (notify: Array<NotifyType>) => { // ошибки с сервера (внутри ответа 200)
        return {type: SET_ERROR_200, notify} as const
    },
    setNotifyArchive: (notifyItem: NotifyType) => { // архив ошибок после рендера (внутри ответа 200)
        return {type: SET_ERROR_200_ARCHIVE, notifyItem} as const
    }
}

type AppActionTypes = InferActionsTypes<typeof appActions>

type InitialStateType = typeof initialState

const initialState = { //стейт по умолчанию для инициализации приложения
    initialisedApp: false, // флаг приложение инициализировано?
    patch: "", // название страницы из URL
    pageWidth: document.documentElement.scrollWidth, // ширина страницы по умолчанию
    mobileWidth: 620,
    isFetching: false, // статус загрузки (крутилка)
    errorGlobal: {} as ErrorType,// глобальные ошибки (все кроме 200 ответа)
    notify: [] as Array<NotifyType>, // ошибки с сервера для рендера (внутри ответа 200)
    notifyArchive: [] as Array<NotifyType> // архивирование ошибок 200
}

const appReducer = (state: InitialStateType = initialState, action: AppActionTypes): InitialStateType => {//редьюсер инициализации приложения
    let stateCopy: InitialStateType; // объявлениечасти части стейта до изменения редьюсером
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
        case TOGGLE_IS_FETCHING:
            stateCopy = {
                ...state,
                isFetching: action.isFetching
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_PAGE_WIDTH: // экшн записи ширины экрана
            stateCopy = {
                ...state, // копия всего стейта
                pageWidth: action.pageWidth, // смена флага инициализации приложения на true
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_ERROR_GLOBAL: // экшн записи глобальной ошибки с сервера (все кроме 200 ответа)
            stateCopy = {
                ...state, // копия всего стейта
                errorGlobal: action.errorGlobal,
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_ERROR_200: // экшн записи ошибки с сервера (внутри 200 ответа)
            stateCopy = {
                ...state, // копия всего стейта
                notify: action.notify,
            }
            return stateCopy; // возврат копии стейта после изменения
        case SET_ERROR_200_ARCHIVE: // экшн записи ошибок с сервера (внутри 200 ответа) в архив
            stateCopy = {
                ...state, // копия всего стейта
                // удалить из массива ошибок выбранный объект ошибки
                notify: state.notify.filter((item: NotifyType)=> item.timeUnix!==action.notifyItem.timeUnix ), //
                // добавить эту ошибку в массив архива для ошибок
                notifyArchive: [...state.notifyArchive, action.notifyItem],
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export const initialisedAppThunkCreator = (): ComThunkTp<AppActionTypes> => {// санкреатор инициализации приложения
    return (dispatch, getState) => { // санки  инициализации приложения
        const promise1 = dispatch( getAuthMeThunkCreator() ) // проверка статуса авторизации
        const promise2 = dispatch( getThemeThunkCreator() ) // получение темы
        Promise.all( [promise1, promise2] ) // если все промисы зарезолвились
            .then( () => {
                dispatch( appActions.setInitialisedApp() ) // смена флага инициализации на true
            } )
    };
}

export default appReducer;










