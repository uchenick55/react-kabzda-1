import {bedug_mode} from "./store-redux";
import {apiDialogs} from "../components/api/apiLocalStorage";

const SEND_MESSAGE = "myApp/dialogs-reducer/SEND-MESSAGE"; // Константа отправки сообщения
const DIALOGS_INITIAL_STATE = "myApp/dialogs-reducer/DIALOGS_INITIAL_STATE";  //константа зануления при логауте
const SET_MESSAGES =  "myApp/dialogs-reducer/SET_MESSAGES";  //константа задания списка сообщений в стейт
const DIALOG_USER_ID =  "myApp/dialogs-reducer/DIALOG_USER_ID"; //константа задания ID пользователя, с кем диалог
const DIALOG_LAST_UPDATE_TIME =  "myApp/dialogs-reducer/DIALOG_LAST_UPDATE_TIME"; //константа задания ID пользователя, с кем диалог

export let sendMessageCreator = (formDataNewMessage) => { // экшнкреатор отправки сообщений
    return {type: SEND_MESSAGE, formDataNewMessage}
};
export let dialogsInitialState = () => { // экшнкреатор зануления при логауте
    return {type: DIALOGS_INITIAL_STATE, }
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

let initialState = { // стейт сообщений по умолчанию
        messages2: [],
        dialogUserID: null, // ID пользователя с кем диалог
        dialogLastUpdateTime: null, // последнее время обновления текущего диалога
        dialogs: [ // список диалогов по умолчанию (заглушка)
            {
                id: 1,
                name: "Artem",
                avaSrc: "https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"
            },
            {id: 2, name: "Misha", avaSrc: "https://cdn1.flamp.ru/3d883d4bb9e3bfa25a8340615b116a80.jpg"},
            {
                id: 3,
                name: "Danil",
                avaSrc: "https://pixelbox.ru/wp-content/uploads/2020/11/ava-maincraft-youtube-76.jpg"
            },
            {
                id: 4,
                name: "Natasha",
                avaSrc: "https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg"
            },
            {
                id: 5,
                name: "Kostya",
                avaSrc: "https://pixelbox.ru/wp-content/uploads/2021/10/dark-avatar-vk-pixelbox.ru-2.jpg"
            },
            {id: 6, name: "Zhenya", avaSrc: "https://cdn1.flamp.ru/a981cc28c84f99d8f480c8ea6b559671.jpg"}
        ],
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
             if (bedug_mode) {console.log("dialogs-reducer.js, SEND_MESSAGE: ", state, stateCopy)} // дебаг
         return stateCopy
       case DIALOGS_INITIAL_STATE: // экшн отправки сообщений по данным из формы диалогов
          stateCopy = initialState;
          if (bedug_mode) {console.log("dialogs-reducer.js, DIALOGS_INITIAL_STATE: ", state, stateCopy)} // дебаг
          return stateCopy
       case SET_MESSAGES: // экшн отправки сообщений по данным из формы диалогов
         stateCopy = {
           ...state,
           messages2: action.updatedMessages, // добавление сообщений
         }
          if (bedug_mode) {console.log("dialogs-reducer.js, SET_MESSAGES(LocalStorage): ", state, stateCopy)} // дебаг
          return stateCopy
       case DIALOG_USER_ID: // экшн  задания ID пользователя, с кем диалог
         stateCopy = {
           ...state,
           dialogUserID: action.dialogUserID, // задание ID пользователя, с кем диалог
         }
          if (bedug_mode) {console.log("dialogs-reducer.js, DIALOG_USER_ID: ", state, stateCopy)} // дебаг
          return stateCopy
       case DIALOG_LAST_UPDATE_TIME: // экшн  задания последнего времени обновления текущего диалога
         stateCopy = {
           ...state,
           dialogLastUpdateTime: action.dialogLastUpdateTime, //  задание последнего времени обновления текущего диалога
         }
          if (bedug_mode) {console.log("dialogs-reducer.js, DIALOG_LAST_UPDATE_TIME: ", state, stateCopy)} // дебаг
          return stateCopy
        default:
            return state;
    }
}

export let getDialogsThunkCreator = (myID, userID) => {//санкреатор получения диалогов с данными
  if (bedug_mode) {console.log("getDialogsThunkCreator")}

  let getDialogsThunk = async (dispatch) => {// санка получения сообщений диалога
    let updatedMessages = await apiDialogs.getDialog(myID, userID)
    if (bedug_mode) {console.log("dialogs-reducer.js, getDialogsThunkCreator->: dispatch(setMessages)->SET_MESSAGES")} // дебаг
    dispatch(setMessages(updatedMessages))
  }
  return getDialogsThunk
}
export let sendDialogsThunkCreator = (formDataNewMessage, myID, userID) => {//санкреатор отправки нового сообщения в диалог
  if (bedug_mode) {console.log("sendDialogsThunkCreator")}

  let sendDialogsThunk = async (dispatch) => {// санка отправки нового сообщения в диалог
    let updatedMessages = await apiDialogs.postDialog(formDataNewMessage, myID, userID)
    if (bedug_mode) {console.log("dialogs-reducer.js, sendDialogsThunkCreator->: dispatch(setMessages)->SET_MESSAGES")} // дебаг
    dispatch(setMessages(updatedMessages))
  }
  return sendDialogsThunk
}

//getDialogLastUpdateTimeTnkCrt
export let getDialogLastUpdateTimeTnkCrt = (myID, userID) => {//санкреатор получения диалогов с данными
  if (bedug_mode) {console.log("getDialogLastUpdateTimeTnkCrt")}

  let getDialogLastUpdateTimeTnk = async (dispatch) => {// санка получения сообщений диалога
    let dialogLastUpdateTime = await apiDialogs.getUpdateTime(myID, userID)
    if (bedug_mode) {console.log("dialogs-reducer.js, getDialogLastUpdateTimeTnkCrt->: dispatch(setDialogLastUpdateTime()->DIALOG_LAST_UPDATE_TIME")} // дебаг
    dispatch(setDialogLastUpdateTime(dialogLastUpdateTime))
  }
  return getDialogLastUpdateTimeTnk
}




export default dialogsReducer;
