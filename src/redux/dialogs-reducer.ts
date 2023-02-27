import {apiDialogs} from "../components/api/apiLocalStorage";
import {apiDialogs2} from "../components/api/api";

const SEND_MESSAGE = "myApp/dialogs-reducer/SEND-MESSAGE"; // Константа отправки сообщения
const DIALOGS_INITIAL_STATE = "myApp/dialogs-reducer/DIALOGS_INITIAL_STATE";  //константа зануления при логауте
const SET_MESSAGES = "myApp/dialogs-reducer/SET_MESSAGES";  //константа задания списка сообщений в стейт
const DIALOG_USER_ID = "myApp/dialogs-reducer/DIALOG_USER_ID"; //константа задания ID пользователя, с кем диалог
const DIALOG_LAST_UPDATE_TIME = "myApp/dialogs-reducer/DIALOG_LAST_UPDATE_TIME"; //константа задания ID пользователя, с кем диалог
const DIALOG_USER_FOLLOWED = "myApp/dialogs-reducer/DIALOG_USER_FOLLOWED"; //константа проверки follow/unfollow выбранный пользователь (для списка диалогов)
const GET_MY_DIALOG_LIST = "myApp/dialogs-reducer/GET_MY_DIALOG_LIST"; //константа получения моего диалогЛиста

export let sendMessageCreator = (formDataNewMessage) => { // экшнкреатор отправки сообщений
  return {type: SEND_MESSAGE, formDataNewMessage}
};
export let dialogsInitialState = () => { // экшнкреатор зануления при логауте
  return {type: DIALOGS_INITIAL_STATE,}
};
export let setMessages = (updatedMessages) => { // экшнкреатор задания списка сообщений в стейт messages2
  return {type: SET_MESSAGES, updatedMessages}
};
export let setdialogUserID = (dialogUserID) => { // экшнкреатор задания списка сообщений в стейт messages2
  return {type: DIALOG_USER_ID, dialogUserID}
};
export let setDialogLastUpdateTime = (dialogLastUpdateTime) => { // экшнкреатор задания последнего времени обновления текущего диалога
  return {type: DIALOG_LAST_UPDATE_TIME, dialogLastUpdateTime}
};
export let setDialogUserFollowed = (dialogUserFollowed) => { // экшнкреатор задания последнего времени обновления текущего диалога
  return {type: DIALOG_USER_FOLLOWED, dialogUserFollowed}
};
export let getMyDialogList = (myDialogList) => { // экшнкреатор задания моего диалогЛиста для вывода
  return {type: GET_MY_DIALOG_LIST, myDialogList}
};

let initialState = { // стейт сообщений по умолчанию
  messages2: [],
  dialogUserID: null, // ID пользователя с кем диалог
  dialogUserFollowed: false, // собеседник followed? (друг)
  dialogLastUpdateTime: null, // последнее время обновления текущего диалога
  dialogs2: [] // мой диалогЛист. Берет данные с LocalStorage по всем входящим диалогам
}

let dialogsReducer = (state = initialState, action) => { // редьюсер диалогов
  let stateCopy; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
    case SEND_MESSAGE: // экшн отправки сообщений по данным из формы диалогов
      let body = action.formDataNewMessage;
      stateCopy = {
        ...state,
        messages: [...state.messages, {id: 6, message: body}], // добавление сообщений (заглушка)
      }
      return stateCopy
    case DIALOGS_INITIAL_STATE: // экшн отправки сообщений по данным из формы диалогов
      stateCopy = initialState;
      return stateCopy
    case SET_MESSAGES: // экшн отправки сообщений по данным из формы диалогов
      stateCopy = {
        ...state,
        messages2: action.updatedMessages, // добавление сообщений
      }
      return stateCopy
    case DIALOG_USER_ID: // экшн  задания ID пользователя, с кем диалог
      stateCopy = {
        ...state,
        dialogUserID: action.dialogUserID, // задание ID пользователя, с кем диалог
      }
      return stateCopy
    case DIALOG_LAST_UPDATE_TIME: // экшн  задания последнего времени обновления текущего диалога
      if (state.dialogLastUpdateTime !== action.dialogLastUpdateTime) { // проверяем, есть ли смысл сетать время обновления диалога (если оно изменилось)
        stateCopy = {
          ...state,
          dialogLastUpdateTime: action.dialogLastUpdateTime, //  задание последнего времени обновления текущего диалога
        }
        return stateCopy
      }
      return state // если время не поменялось,  вернуть текущий стейт
    case DIALOG_USER_FOLLOWED: // экшн  проверки follow/unfollow выбранный пользователь (для формирования списка диалогов)
      stateCopy = {
        ...state,
        dialogUserFollowed: action.dialogUserFollowed, //  задание follow/unfollow выбранного пользователя (для формирования списка диалогов)
      }
      return stateCopy
    case GET_MY_DIALOG_LIST: // экшн  задания моего диалоглиста
      stateCopy = {
        ...state,
        dialogs2: action.myDialogList, //  задание моего диалоглиста
      }
      return stateCopy
    default:
      return state;
  }
}

export let getDialogsThunkCreator = (myId, userId) => {//санкреатор получения диалогов с данными

  let getDialogsThunk = async (dispatch) => {// санка получения сообщений диалога
    let updatedMessages = await apiDialogs.getDialog(myId, userId)
    dispatch(setMessages(updatedMessages))
  }
  return getDialogsThunk
}
export let sendDialogsThunkCreator = (formDataNewMessage, myId, MyName, MyPhoto, userId) => {//санкреатор отправки нового сообщения в диалог

  let sendDialogsThunk = async (dispatch) => {// санка отправки нового сообщения в диалог
    let updatedMessages = await apiDialogs.postDialog(formDataNewMessage, myId, MyName, MyPhoto, userId)
    dispatch(setMessages(updatedMessages))
  }
  return sendDialogsThunk
}

export let getDialogLastUpdateTimeTnkCrt = (myId, userId) => {//санкреатор получения диалогов с данными
  let getDialogLastUpdateTimeTnk = async (dispatch) => {// санка получения сообщений диалога
    let dialogLastUpdateTime = await apiDialogs.getUpdateTime(myId, userId) // запросить время обновления текущего диалога
    dispatch(setDialogLastUpdateTime(dialogLastUpdateTime)) // отправить в BLL время последнего обновления текущего диалога
  }
  return getDialogLastUpdateTimeTnk
}

export let deleteMessageThunkCreator = (messageID, myId, userId) => {//санкреатор удаления сообщения из далога
  let deleteMessageThunk = async (dispatch) => {// санка удаления сообщения из далога
    let dialogAfterDeleteMessage = await apiDialogs.deleteMessage(messageID, myId, userId) // удалить сообщение на стороне сервера и запросить обновленные данные
    dispatch(setMessages(dialogAfterDeleteMessage))// записать в стейт обновленный список сообщений
  }
  return deleteMessageThunk
}

export let getFollowThunkCreator = (dialogUserID) => {//санкреатор проверки follow/unfollow выбранного юзера для составления списка диалогов
  let getFollowThunk = async (dispatch) => {// санка
    let dialogUserFollowed = await apiDialogs2.getFollow(dialogUserID) // проверка follow/unfollow выбранного юзера для составления списка диалогов
    dispatch(setDialogUserFollowed(dialogUserFollowed))// записать в стейт follow/unfollow выбранного пользователя
  }
  return getFollowThunk
}
export let getMyDialogListThunkCreator = (myId) => {//санкреатор получения моего диалогЛиста
  let getMyDialogListThunk = async (dispatch) => {// санка
    let myDialogList = await apiDialogs.getDialogListMyID(myId) // получение моего диалогЛиста
    dispatch(getMyDialogList(myDialogList))// записать в стейт мой диалоглист
  }
  return getMyDialogListThunk
}
export let updateDialogListThunkCreator = (userId1, userId2, Name2, Photo2) => {
  //санкреатор обновления диалогЛиста (моего когда я пишу кому то сообщение) - запись в localStorage.
  let updateDialogListThunk = async (dispatch) => {// санка
      await apiDialogs.updateDialogListUserId(userId1, userId2, Name2, Photo2) // получение моего диалогЛиста
  }
  return updateDialogListThunk
}

export let deleteDialogThunkCreator = (dialogId, userId1, userId2) => {
  //санкреатор удаления диалога из диалогЛиста
  let deleteDialogThunk = async (dispatch) => {// санка
      await apiDialogs.deleteDialog(dialogId, userId1, userId2) // получение моего диалогЛиста после удаления диалога
// записать в стейт не провожу - обновление раз в секунду
  }
  return deleteDialogThunk
}

export default dialogsReducer;

