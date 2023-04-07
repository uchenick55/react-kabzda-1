import {apiDialogs} from "../components/api/apiLocalStorage";
// @ts-ignore
import {apiDialogs2} from "../components/api/api.ts";
import {Dispatch} from "redux";
import {GlobalStateType} from "./store-redux";

const DIALOGS_INITIAL_STATE = "myApp/dialogs-reducer/DIALOGS_INITIAL_STATE";  //константа зануления при логауте
const SET_MESSAGES = "myApp/dialogs-reducer/SET_MESSAGES";  //константа задания списка сообщений в стейт
const DIALOG_USER_ID = "myApp/dialogs-reducer/DIALOG_USER_ID"; //константа задания ID пользователя, с кем диалог
const DIALOG_LAST_UPDATE_TIME = "myApp/dialogs-reducer/DIALOG_LAST_UPDATE_TIME"; //константа задания ID пользователя, с кем диалог
const DIALOG_USER_FOLLOWED = "myApp/dialogs-reducer/DIALOG_USER_FOLLOWED"; //константа проверки follow/unfollow выбранный пользователь (для списка диалогов)
const GET_MY_DIALOG_LIST = "myApp/dialogs-reducer/GET_MY_DIALOG_LIST"; //константа получения моего диалогЛиста

type dialogsInitialStateType =  {type: typeof DIALOGS_INITIAL_STATE}
export let dialogsInitialState = ():dialogsInitialStateType => { // экшнкреатор зануления при логауте
  return {type: DIALOGS_INITIAL_STATE}
};

type setMessagesActionType = {type: typeof SET_MESSAGES, updatedMessages:Array<messages2Type>}
export let setMessages = (updatedMessages:Array<messages2Type>):setMessagesActionType => { // экшнкреатор задания списка сообщений в стейт messages2
  return {type: SET_MESSAGES, updatedMessages}
};

type setdialogUserIDActionType = {type: typeof DIALOG_USER_ID, dialogUserID:number}
export let setdialogUserID = (dialogUserID:number):setdialogUserIDActionType => { // экшнкреатор задания списка сообщений в стейт messages2
  return {type: DIALOG_USER_ID, dialogUserID}
};

type setDialogLastUpdateTimeActionType = {type: typeof  DIALOG_LAST_UPDATE_TIME, dialogLastUpdateTime:string}
export let setDialogLastUpdateTime = (dialogLastUpdateTime:string):setDialogLastUpdateTimeActionType => { // экшнкреатор задания последнего времени обновления текущего диалога
  return {type: DIALOG_LAST_UPDATE_TIME, dialogLastUpdateTime}
};

type setDialogUserFollowedActionType = {type: typeof DIALOG_USER_FOLLOWED, dialogUserFollowed:boolean}
export let setDialogUserFollowed = (dialogUserFollowed:boolean):setDialogUserFollowedActionType => { // экшнкреатор задания последнего времени обновления текущего диалога
  return {type: DIALOG_USER_FOLLOWED, dialogUserFollowed}
};

type getMyDialogListActionType={type: typeof GET_MY_DIALOG_LIST, myDialogList:Array<dialogs2Type>}
export let getMyDialogList = (myDialogList:Array<dialogs2Type>):getMyDialogListActionType => { // экшнкреатор задания моего диалогЛиста для вывода
  return {type: GET_MY_DIALOG_LIST, myDialogList}
};

type ActionTypes = getMyDialogListActionType | setDialogUserFollowedActionType | setDialogLastUpdateTimeActionType |
    setdialogUserIDActionType | setMessagesActionType | dialogsInitialStateType

type dialogs2Type = {
  dialogId: number
  userId: number
  userName: string
  userPhoto: string
}

type DateType = {
  Day: number
  Hour: number
  Minutes: number
  Month:string
  Seconds: number
  Year :number
}

type messages2Type = {
  id: number
  Date: DateType
  userId: number
  message: string
}
type initialStateType = { // стейт сообщений по умолчанию
  messages2: Array<messages2Type> | [],
  dialogUserID: number | null, // ID пользователя с кем диалог
  dialogUserFollowed: boolean, // собеседник followed? (друг)
  dialogLastUpdateTime: string | null, // последнее время обновления текущего диалога
  dialogs2: Array<dialogs2Type> | [] // мой диалогЛист. Берет данные с LocalStorage по всем входящим диалогам
}
let initialState:initialStateType = { // стейт сообщений по умолчанию
  messages2: [],
  dialogUserID: null, // ID пользователя с кем диалог
  dialogUserFollowed: false, // собеседник followed? (друг)
  dialogLastUpdateTime: null, // последнее время обновления текущего диалога
  dialogs2: [] // мой диалогЛист. Берет данные с LocalStorage по всем входящим диалогам
}

let dialogsReducer = (state:initialStateType = initialState, action: ActionTypes):initialStateType => { // редьюсер диалогов
  let stateCopy:initialStateType; // объявлениечасти части стейта до изменения редьюсером
  switch (action.type) {
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

export let getDialogsThunkCreator = (myId:number, userId:number) => {//санкреатор получения диалогов с данными
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => {// санка получения сообщений диалога
    let updatedMessages = await apiDialogs.getDialog(myId, userId)
    dispatch(setMessages(updatedMessages))
  }
}
export let sendDialogsThunkCreator = (formDataNewMessage:string, myId:number, MyName:string, MyPhoto:string, userId:number) => {//санкреатор отправки нового сообщения в диалог
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => {// санка отправки нового сообщения в диалог
    let updatedMessages = await apiDialogs.postDialog(formDataNewMessage, myId, MyName, MyPhoto, userId)
    dispatch(setMessages(updatedMessages))
  }
}

export let getDialogLastUpdateTimeTnkCrt = (myId:number, userId:number) => {//санкреатор получения диалогов с данными
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => {// санка получения сообщений диалога
    let dialogLastUpdateTime = await apiDialogs.getUpdateTime(myId, userId) // запросить время обновления текущего диалога
    dispatch(setDialogLastUpdateTime(dialogLastUpdateTime)) // отправить в BLL время последнего обновления текущего диалога
  }
}

export let deleteMessageThunkCreator = (messageID:number, myId:number, userId:number) => {//санкреатор удаления сообщения из далога
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => {// санка удаления сообщения из далога
    let dialogAfterDeleteMessage = await apiDialogs.deleteMessage(messageID, myId, userId) // удалить сообщение на стороне сервера и запросить обновленные данные
    dispatch(setMessages(dialogAfterDeleteMessage))// записать в стейт обновленный список сообщений
  }
}

/*let getFollowThunkCreator = (dialogUserID) => {//санкреатор проверки follow/unfollow выбранного юзера для составления списка диалогов
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => {// санка
    let dialogUserFollowed = await apiDialogs2.getFollow(dialogUserID) // проверка follow/unfollow выбранного юзера для составления списка диалогов
    dispatch(setDialogUserFollowed(dialogUserFollowed))// записать в стейт follow/unfollow выбранного пользователя
  }
}*/
export let getMyDialogListThunkCreator = (myId:number) => {//санкреатор получения моего диалогЛиста
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => {// санка
    let myDialogList = await apiDialogs.getDialogListMyID(myId) // получение моего диалогЛиста
    dispatch(getMyDialogList(myDialogList))// записать в стейт мой диалоглист
  }
}

//updateDialogListThunkCreator(myId, response.userId, response.fullName, response.photos.small
export let updateDialogListThunkCreator = (userId1:number, userId2:number, Name2:string, Photo2:string) => {
  //санкреатор обновления диалогЛиста (моего когда я пишу кому то сообщение) - запись в localStorage.
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => {// санка
    await apiDialogs.updateDialogListUserId(userId1, userId2, Name2, Photo2) // получение моего диалогЛиста
  }
}

export let deleteDialogThunkCreator = (dialogId:number, userId1:number, userId2:number) => {
  //санкреатор удаления диалога из диалогЛиста
  return async (dispatch:Dispatch<ActionTypes>, getState: () => GlobalStateType) => {// санка
    await apiDialogs.deleteDialog(dialogId, userId1, userId2) // получение моего диалогЛиста после удаления диалога
// записать в стейт не провожу - обновление раз в секунду
  }
}

export default dialogsReducer;

