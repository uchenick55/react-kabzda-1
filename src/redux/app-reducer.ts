import {getAuthMeThunkCreator} from "./auth-reducer";
import {getThemeThunkCreator} from "./theme-reducer";
import {GlobalStateType} from "./store-redux";
import {ThunkAction} from "redux-thunk";

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения
const APP_INITIAL_STATE = "myApp/app-reducer/APP_INITIAL_STATE"; //константа зануления при логауте
const SET_PATCH = "myApp/app-reducer/SET_PATCH"; //константа задания пути в URL

type setInitialisedAppType = {type: typeof SET_INITIALISED_APP}
export let setInitialisedApp = ():setInitialisedAppType => { // экшн креатор  инициализации приложения
  return {type: SET_INITIALISED_APP}
};

type appInitialStateActionType = {type: typeof APP_INITIAL_STATE}
export let appInitialState = ():appInitialStateActionType => { // экшн зануления при логауте
  return {type: APP_INITIAL_STATE}
};
type setPatchActionType = {type: typeof SET_PATCH, patch:string }
export let setPatch = (patch:string):setPatchActionType => { // экшн зануления при логауте
  return {type: SET_PATCH, patch}
};

type ActionTypes = appInitialStateActionType | setInitialisedAppType | setPatchActionType

type initialStateType = typeof initialState

let initialState = { //стейт по умолчанию для инициализации приложения
  initialisedApp: false, // флаг приложение инициализировано?
  patch: ""
}

let appReducer = (state:initialStateType = initialState, action:ActionTypes):initialStateType => {//редьюсер инициализации приложения
  let stateCopy:initialStateType; // объявлениечасти части стейта до изменения редьюсером
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
    default:
      return state; // по умолчанию стейт возврашается неизмененным
  }
}
type ThunkType = ThunkAction<
    void,    // санка ничего не возвращает
    GlobalStateType,    // глобальный стейт из redux
    unknown,    // нет доп параметров
    ActionTypes // все типы ActionCreator
    >
export let initialisedAppThunkCreator = ():ThunkType => {// санкреатор инициализации приложения
  return (dispatch, getState) => { // санки  инициализации приложения
    const promise1 = dispatch(getAuthMeThunkCreator()) // проверка статуса авторизации
    const promise2 = dispatch(getThemeThunkCreator()) // получение темы
    Promise.all([promise1, promise2]) // если все промисы зарезолвились
        .then(() => {
          dispatch(setInitialisedApp()) // смена флага инициализации на true
        })
  };
}

export default appReducer;










