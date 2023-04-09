import {postFeedBack22} from "../components/api/api";
import {apiFeedBackDataType} from "../types/commonTypes";
import {Dispatch} from "redux";
import {GlobalStateType} from "./store-redux";

const SET_FEED_BACK_STATUS = "myApp/feedback-reducer/SET_FEED_BACK_STATUS"; // константа для задания статуса feedback

type setFeedBackStatusActionType =  {type: typeof SET_FEED_BACK_STATUS, feedBackStatus:string}
export let setFeedBackStatus = (feedBackStatus:string):setFeedBackStatusActionType => { // экшн креатор задания feedBackStatus
  return {type: SET_FEED_BACK_STATUS, feedBackStatus}
};

type initialStateType = { feedBackStatus: string }
let initialState:initialStateType = { //стейт по умолчанию темы
  feedBackStatus: "" // статус отправки сообщения (feedBack) - если не нулевой отображается вместо формы сообщения
}

type ActionTypes = setFeedBackStatusActionType

let feedBackReducer = (state:initialStateType = initialState, action:ActionTypes):initialStateType => {//редьюсер отправки сообщения
  let stateCopy:initialStateType; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
    case SET_FEED_BACK_STATUS: // экшн задания feedBackStatus
      stateCopy = {
        ...state,
        feedBackStatus: action.feedBackStatus
      }
      return stateCopy; // возврат копии стейта после изменения
    default:
      return state; // по умолчанию стейт возврашается неизмененным
  }
}

export let postFeedBackThunkCreator2 = (data:apiFeedBackDataType) => {// санкреатор отправки фидбека
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => { // санка отправки фидбека
    await postFeedBack22(data) //
        .then(() => dispatch(setFeedBackStatus("Скоро мы получим ваше письмо")))// статсус задать в BLL "Скоро мы получим ваше письмо"
        .catch((err:object) => dispatch(setFeedBackStatus((err.toString()))));// в статус записать ошибку с сервера и задать в BLL
  };
}

export default feedBackReducer;
