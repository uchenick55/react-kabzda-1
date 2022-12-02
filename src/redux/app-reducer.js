import {getAuthMeThunkCreator} from "./auth-reducer";
import {bedug_mode} from "./store-redux";

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения
const APP_INITIAL_STATE = "myApp/app-reducer/APP_INITIAL_STATE"; //константа зануления при логауте

export let setInitialisedApp = () => { // экшн креатор  инициализации приложения
  return {type: SET_INITIALISED_APP}
};
export let appInitialState = () => { // экшн зануления при логауте
  return {type: APP_INITIAL_STATE}
};

let initialState = { //стейт по умолчанию для инициализации приложения
  initialisedApp: false, // флаг приложение инициализировано?
  bedug_mode: true,
}

let appReducer = (state = initialState, action) => {//редьюсер инициализации приложения
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
    case SET_INITIALISED_APP: // экшн инициализации приложения
      stateCopy = {
        ...state, // копия всего стейта
        initialisedApp: true, // смена флага инициализации приложения на true
      }
      if (bedug_mode) {console.log("app-reducer.js, SET_INITIALISED_APP: ", state, stateCopy)} // дебаг
      return stateCopy; // возврат копии стейта после изменения
    case APP_INITIAL_STATE: // экшн зануления при логауте
      stateCopy = initialState
      if (bedug_mode) {console.log("app-reducer.js, APP_INITIAL_STATE: ", state, stateCopy)} // дебаг
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
        if (bedug_mode) {console.log("app-reducer.js, initialisedAppThunkCreator.then: ", "setInitialisedApp()->SET_INITIALISED_APP")} // дебаг
        dispatch(setInitialisedApp()) // смена флага инициализации на true

      })
  }
  return initialisedAppThunk;
}

export default appReducer;










