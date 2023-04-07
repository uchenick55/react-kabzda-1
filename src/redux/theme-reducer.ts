import {apiCommon} from "../components/api/apiLocalStorage";
import {Dispatch} from "redux";
import {GlobalStateType} from "./store-redux";


const SET_THEME = "myApp/dark-light-reducer/SET_THEME"; //константа задания темы

type setThemeActionType = {type: typeof SET_THEME, themeUpdate:"light" | "dark"  }
export let setTheme = (themeUpdate:"light" | "dark"):setThemeActionType => { // экшн задания темы
  return {type: SET_THEME, themeUpdate }
};

type ActionTypes = setThemeActionType

type initialStateType = {
  themeBLL:"light" | "dark"
}
let initialState:initialStateType = { //стейт по умолчанию темы
  themeBLL: "light", // тема в bll по умолчанию
}

let themeReducer = (state:initialStateType = initialState, action:ActionTypes):initialStateType => {//редьюсер задания темы
  let stateCopy:initialStateType; // объявлениечасти части стейта до изменения редьюсером
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

export let setThemeThunkCreator = (theme1:"light" | "dark") => {//санкреатор задания темы в LocalStorage
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => { // санка задания темы в LocalStorage
    const response1 = await apiCommon.putTheme1(theme1)  //записать значение темы в localStorage
    if (response1) {
      dispatch(setTheme(response1))  //записать считаное из localStorage значение темы в store
    }

  }
}
export let getThemeThunkCreator = () => {//санкреатор получения темы из LocalStorage
  let getThemeThunk = async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => { // санка получения темы из LocalStorage
    const response1 = await apiCommon.getTheme1()  //получить значение темы из localStorage
    if (response1) {
      dispatch(setTheme(response1))  //записать считаное из localStorage значение темы в store
    }

  }
  return getThemeThunk
}


export default themeReducer;










