import {bedug_mode} from "./store-redux";
import {apiCommon} from "../components/api/apiLocalStorage";


const SET_THEME = "myApp/dark-light-reducer/SET_THEME"; //константа задания темы

export let setTheme = (themeUpdate) => { // экшн задания темы
  return {type: SET_THEME, themeUpdate }
};

let initialState = { //стейт по умолчанию темы
  themeBLL: "light", // тема в bll по умолчанию
}

let themeReducer = (state = initialState, action) => {//редьюсер задания темы
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
    case SET_THEME: // кейс задания темы
      stateCopy = {
        ...state, // копия всего стейта
        themeBLL: action.themeUpdate, // задание темы в BLL
      }
      if (bedug_mode) {console.log("theme-reducer.js, SET_THEME: ", state, stateCopy)} // дебаг
      return stateCopy; // возврат копии стейта после изменения
    default:
      return state; // по умолчанию стейт возврашается неизмененным
  }
}

export let setThemeThunkCreator = (theme1) => {//санкреатор задания темы в LocalStorage
  let setThemeThunk = async (dispatch) => { // санка задания темы в LocalStorage
    const response1 = await apiCommon.putTheme1(theme1)  //записать значение темы в localStorage
    if (response1) {
      if (bedug_mode) {console.log("theme-reducer.js, setThemeThunkCreator dispatch(setTheme()) ->SET_THEME" )} // дебаг
      dispatch(setTheme(response1))  //записать считаное из localStorage значение темы в store
    }

  }
  return setThemeThunk
}
export let getThemeThunkCreator = () => {//санкреатор получения темы из LocalStorage
  let getThemeThunk = async (dispatch) => { // санка получения темы из LocalStorage
    const response1 = await apiCommon.getTheme1()  //получить значение темы из localStorage
    if (response1) {
      if (bedug_mode) {console.log("theme-reducer.js, getThemeThunkCreator dispatch(setTheme()) ->SET_THEME" )} // дебаг
      dispatch(setTheme(response1))  //записать считаное из localStorage значение темы в store
    }

  }
  return getThemeThunk
}


export default themeReducer;










