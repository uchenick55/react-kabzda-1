import {bedug_mode} from "./store-redux";

const SET_THEME = "myApp/dark-light-reducer/SET_THEME"; //константа задания темы

export let setTheme = (themeUpdate) => { // экшн задания темы
  return {type: SET_THEME, themeUpdate }
};

let initialState = { //стейт по умолчанию темы
  themeBLL: "dark", // тема в bll по умолчанию
}

let darkLightReducer = (state = initialState, action) => {//редьюсер задания темы
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
    case SET_THEME: // кейс задания темы
      stateCopy = {
        ...state, // копия всего стейта
        themeBLL: action.themeUpdate, // задание темы в BLL
      }
      if (bedug_mode) {console.log("dark-light-reducer.js, SET_THEME: ", state, stateCopy)} // дебаг
      return stateCopy; // возврат копии стейта после изменения
    default:
      return state; // по умолчанию стейт возврашается неизмененным
  }
}

export default darkLightReducer;










