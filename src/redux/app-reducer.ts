// @ts-ignore
import {getAuthMeThunkCreator} from "./auth-reducer.ts";
// @ts-ignore
import {getThemeThunkCreator} from "./theme-reducer.ts";
import {Dispatch} from "redux";
import {GlobalStateType} from "./store-redux";

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения
const APP_INITIAL_STATE = "myApp/app-reducer/APP_INITIAL_STATE"; //константа зануления при логауте

type setInitialisedApp = {type: typeof SET_INITIALISED_APP}
export let setInitialisedApp = ():setInitialisedApp => { // экшн креатор  инициализации приложения
  return {type: SET_INITIALISED_APP}
};

type appInitialStateActionType = {type: typeof APP_INITIAL_STATE}
export let appInitialState = ():appInitialStateActionType => { // экшн зануления при логауте
  return {type: APP_INITIAL_STATE}
};

type ActionTypes = appInitialStateActionType | setInitialisedApp

type initialStateType = {
  initialisedApp: boolean
}
let initialState:initialStateType = { //стейт по умолчанию для инициализации приложения
  initialisedApp: false, // флаг приложение инициализировано?
}

let appReducer = (state:initialStateType = initialState, action:any):initialStateType => {//редьюсер инициализации приложения
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
    default:
      return state; // по умолчанию стейт возврашается неизмененным
  }
}

export let initialisedAppThunkCreator = () => {// санкреатор инициализации приложения
  return (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => { // санки  инициализации приложения
    const promise1 = dispatch(getAuthMeThunkCreator()) // проверка статуса авторизации
    const promise2 = dispatch(getThemeThunkCreator()) // получение темы
    Promise.all([promise1, promise2]) // если все промисы зарезолвились
        .then(() => {
          dispatch(setInitialisedApp()) // смена флага инициализации на true
        })
  };
}

export default appReducer;










