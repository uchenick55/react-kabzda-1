import {apiCommon} from "../components/api/apiLocalStorage";
import {Dispatch} from "redux";
import {GlobalStateType, InferActionsTypes} from "./store-redux";
import {appActions} from "./app-reducer";

const SET_THEME = "myApp/dark-light-reducer/SET_THEME"; //константа задания темы

export const themeActions = {
    setTheme: (themeUpdate: "light" | "dark") => { // экшн задания темы
        return {type: SET_THEME, themeUpdate} as const
    }
}

type ThemeActionTypes =
    InferActionsTypes<typeof themeActions> |
    InferActionsTypes<typeof appActions>

const initialState = { //стейт по умолчанию темы
    themeBLL: "light" as "light" | "dark", // тема в bll по умолчанию
}
type initialStateType = typeof initialState

const themeReducer = (state: initialStateType = initialState, action: ThemeActionTypes): initialStateType => {//редьюсер задания темы
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case SET_THEME: // кейс задания темы
            stateCopy = {
                ...state, // копия всего стейта
                themeBLL: action.themeUpdate, // задание темы в BLL
            }
            return stateCopy; // возврат копии стейта после изменения
        default:
            return state; // по умолчанию стейт возврашается неизмененным
    }
}

export const setThemeThunkCreator = (theme1: "light" | "dark") => {//санкреатор задания темы в LocalStorage
    return async (dispatch: Dispatch<ThemeActionTypes>, getState: () => GlobalStateType) => { // санка задания темы в LocalStorage
        dispatch(appActions.toggleIsFetchingArray("setThemeThunkCreator", "add")) // добавить процесс в прелоадер

        const response1 = await apiCommon.putTheme1( theme1 )  //записать значение темы в localStorage
        if (response1) {
            dispatch( themeActions.setTheme( response1 ) )  //записать считаное из localStorage значение темы в store

            dispatch(appActions.toggleIsFetchingArray("setThemeThunkCreator", "delete")) // убрать процесс из прелоадера
        }

    }
}
export const getThemeThunkCreator = () => {//санкреатор получения темы из LocalStorage
    const getThemeThunk = async (dispatch: Dispatch<ThemeActionTypes>, getState: () => GlobalStateType) => { // санка получения темы из LocalStorage

        dispatch(appActions.toggleIsFetchingArray("getThemeThunkCreator", "add")) // добавить процесс в прелоадер

        const response1 = await apiCommon.getTheme1()  //получить значение темы из localStorage
        if (response1) {
            response1!==getState().theme.themeBLL && // если тема не совпадает с темой по умолчанию
            dispatch( themeActions.setTheme( response1 ) )  //записать считаное из localStorage значение темы в store

            dispatch(appActions.toggleIsFetchingArray("getThemeThunkCreator", "delete")) // убрать процесс из прелоадера
        }
    }
    return getThemeThunk
}


export default themeReducer;










