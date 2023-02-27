import {getAuthMeThunkCreator} from "./auth-reducer";
import {apiCommon} from "../components/api/apiLocalStorage";

const SET_INITIALISED_APP = "myApp/app-reducer/SET_INITIALISED_APP"; //константа инициализации приложения
const APP_INITIAL_STATE = "myApp/app-reducer/APP_INITIAL_STATE"; //константа зануления при логауте
const SET_INFO_MODE = "myApp/app-reducer/SET_INFO_MODE"; //константа задания режима вывода информации по приложению

export let setInitialisedApp = () => { // экшн креатор  инициализации приложения
  return {type: SET_INITIALISED_APP}
};
export let appInitialState = () => { // экшн зануления при логауте
  return {type: APP_INITIAL_STATE}
};
export let setInfoMode = (info_mode) => { // экшн задания режима вывода информации
  return {type: SET_INFO_MODE, info_mode}
};

let initialState = { //стейт по умолчанию для инициализации приложения
  initialisedApp: false, // флаг приложение инициализировано?
  info_mode: true, // флаг вывода информации по страницам приложения
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
    case SET_INFO_MODE: // экшн переключения режима отображения комментариев (информации) по сайту
      stateCopy = {
        ...state, // копия всего стейта
        info_mode: action.info_mode, // смена флага инициализации приложения
      }
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
export let setInfoModeThunkCreator = (info_mode) => {// санкреатор переключения режима комментариев
  let setInfoModeThunk = async (dispatch) => { // санки  переключения режима комментариев
    let info_modeFromLS = await apiCommon.putInfoMode(info_mode) // задание info_mode в LocalStorage и считывание оттуда же
    dispatch(setInfoMode(info_modeFromLS)) // задать в BLL значение info_mode из LocalStorage
   }
  return setInfoModeThunk;
}
export let getInfoModeThunkCreator = () => {// санкреатор получение режима комментариев
  let getInfoModeThunk = async (dispatch) => { // санки  получения режима комментариев
    let info_modeFromLS = await apiCommon.getInfoMode() // задание info_mode в LocalStorage и считывание оттуда же
    dispatch(setInfoMode(info_modeFromLS)) // задать в BLL значение info_mode из LocalStorage
   }
  return getInfoModeThunk;
}

export default appReducer;










