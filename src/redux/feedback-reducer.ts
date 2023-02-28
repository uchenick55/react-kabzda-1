// @ts-ignore
import {apiFeedBack2} from "../components/api/api.ts";

const SET_FEED_BACK_STATUS = "myApp/feedback-reducer/SET_FEED_BACK_STATUS"; // константа для задания статуса feedback

let initialState = { //стейт по умолчанию темы
  feedBackStatus: "" // статус отправки сообщения (feedBack) - если не нулевой отображается вместо формы сообщения
}

export let setFeedBackStatus = (feedBackStatus) => { // экшн креатор задания feedBackStatus
  return {type: SET_FEED_BACK_STATUS, feedBackStatus}
};


let feedBackReducer = (state = initialState, action) => {//редьюсер отправки сообщения
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
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

export let postFeedBackThunkCreator2 = (data) => {// санкреатор отправки фидбека
  let postFeedBackThunk2 = async (dispatch) => { // санка отправки фидбека
    await apiFeedBack2.postFeedBack2(data) //
      .then(() => dispatch(setFeedBackStatus("Скоро мы получим ваше письмо")))// статсус задать в BLL "Скоро мы получим ваше письмо"
      .catch((err) => dispatch(setFeedBackStatus((err.toString()))));// в статус записать ошибку с сервера и задать в BLL
  }
  return postFeedBackThunk2;
}

export default feedBackReducer;
