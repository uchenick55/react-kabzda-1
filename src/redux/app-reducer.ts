// @ts-ignore
import {getAuthMeThunkCreator} from "./auth-reducer.ts";

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения
const APP_INITIAL_STATE = "myApp/app-reducer/APP_INITIAL_STATE"; //константа зануления при логауте

type setInitialisedApp = {type: typeof SET_INITIALISED_APP}
export let setInitialisedApp = ():setInitialisedApp => { // экшн креатор  инициализации приложения
  return {type: SET_INITIALISED_APP}
};
export let appInitialState = () => { // экшн зануления при логауте
  return {type: APP_INITIAL_STATE}
};

let initialState = { //стейт по умолчанию для инициализации приложения
  initialisedApp: false, // флаг приложение инициализировано?
}

let appReducer = (state = initialState, action) => {//редьюсер инициализации приложения
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
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
  let initialisedAppThunk = (dispatch) => { // санки  инициализации приложения
    const promise1 = dispatch(getAuthMeThunkCreator()) // диспатч инициализации
    Promise.all([promise1])
      .then(() => {

        // если диспатч авторизации прошел успешно (и все остальные диспатчи в массиве)
        dispatch(setInitialisedApp()) // смена флага инициализации на true

      })
  }
  return initialisedAppThunk;
}

export default appReducer;










