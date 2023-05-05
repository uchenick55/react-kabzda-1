import {apiDialogs} from "../components/api/apiLocalStorage";
import { InferActionsTypes} from "./store-redux";
import {ComThunkTp, dialogs2Type, messages2Type, NulableType} from "../types/commonTypes";

const DIALOGS_INITIAL_STATE = "myApp/dialogs-reducer/DIALOGS_INITIAL_STATE";  //константа зануления при логауте
const SET_MESSAGES = "myApp/dialogs-reducer/SET_MESSAGES";  //константа задания списка сообщений в стейт
const DIALOG_USER_ID = "myApp/dialogs-reducer/DIALOG_USER_ID"; //константа задания ID пользователя, с кем диалог
const DIALOG_LAST_UPDATE_TIME = "myApp/dialogs-reducer/DIALOG_LAST_UPDATE_TIME"; //константа задания ID пользователя, с кем диалог
const DIALOG_USER_FOLLOWED = "myApp/dialogs-reducer/DIALOG_USER_FOLLOWED"; //константа проверки follow/unfollow выбранный пользователь (для списка диалогов)
const GET_MY_DIALOG_LIST = "myApp/dialogs-reducer/GET_MY_DIALOG_LIST"; //константа получения моего диалогЛиста

export const DialogsActions = {
    dialogsInitialState: () => { // экшнкреатор зануления при логауте
        return {type: DIALOGS_INITIAL_STATE} as const
    },

    setMessages: (updatedMessages: Array<messages2Type>) => { // экшнкреатор задания списка сообщений в стейт messages2
        return {type: SET_MESSAGES, updatedMessages} as const
    },

    setdialogUserID: (dialogUserID: number) => { // экшнкреатор задания списка сообщений в стейт messages2
        return {type: DIALOG_USER_ID, dialogUserID} as const
    },

    setDialogLastUpdateTime: (dialogLastUpdateTime: string) => { // экшнкреатор задания последнего времени обновления текущего диалога
        return {type: DIALOG_LAST_UPDATE_TIME, dialogLastUpdateTime} as const
    },

    setDialogUserFollowed: (dialogUserFollowed: boolean) => { // экшнкреатор задания последнего времени обновления текущего диалога
        return {type: DIALOG_USER_FOLLOWED, dialogUserFollowed} as const
    },

    getMyDialogList: (myDialogList: Array<dialogs2Type>) => { // экшнкреатор задания моего диалогЛиста для вывода
        return {type: GET_MY_DIALOG_LIST, myDialogList} as const
    }

}

type DialogsActionTypes = InferActionsTypes<typeof DialogsActions>

let initialState = { // стейт сообщений по умолчанию
    messages2: null as NulableType<Array<messages2Type>>, // сообщения по умолчанию нулевые, но могут быть еще и Array<messages2Type>
    dialogUserID: 0 as number, // ID пользователя с кем диалог
    dialogUserFollowed: false, // собеседник followed? (друг)
    dialogLastUpdateTime: "" as string, // последнее время обновления текущего диалога
    dialogs2: null as NulableType<Array<dialogs2Type>> // мой диалогЛист. Берет данные с LocalStorage по всем входящим диалогам
}

type initialStateType = typeof initialState

let dialogsReducer = (state: initialStateType = initialState, action: DialogsActionTypes): initialStateType => { // редьюсер диалогов
    let stateCopy: initialStateType; // объявлениечасти части стейта до изменения редьюсером
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

export const getDialogsThunkCreator = (myId: number, userId: number): ComThunkTp<DialogsActionTypes> => {//санкреатор получения диалогов с данными
    return async (dispatch, getState) => {// санка получения сообщений диалога
        const updatedMessages = await apiDialogs.getDialog( myId, userId )
        dispatch( DialogsActions.setMessages( updatedMessages ) )
    }
}
export const sendDialogsThunkCreator =
    (formDataNewMessage: string, myId: number, MyName: string, MyPhoto: string, userId: number): ComThunkTp<DialogsActionTypes> => {//санкреатор отправки нового сообщения в диалог
        return async (dispatch, getState) => {// санка отправки нового сообщения в диалог
            const updatedMessages = await apiDialogs.postDialog( formDataNewMessage, myId, MyName, MyPhoto, userId )
            dispatch( DialogsActions.setMessages( updatedMessages ) )
        }
    }

export const getDialogLastUpdateTimeTnkCrt = (myId: number, userId: number): ComThunkTp<DialogsActionTypes> => {//санкреатор получения диалогов с данными
    return async (dispatch, getState) => {// санка получения сообщений диалога
        const dialogLastUpdateTime = await apiDialogs.getUpdateTime( myId, userId ) // запросить время обновления текущего диалога
        dispatch( DialogsActions.setDialogLastUpdateTime( dialogLastUpdateTime ) ) // отправить в BLL время последнего обновления текущего диалога
    }
}

export const deleteMessageThunkCreator = (messageID: number, myId: number, userId: number): ComThunkTp<DialogsActionTypes> => {//санкреатор удаления сообщения из далога
    return async (dispatch, getState) => {// санка удаления сообщения из далога
        const dialogAfterDeleteMessage = await apiDialogs.deleteMessage( messageID, myId, userId ) // удалить сообщение на стороне сервера и запросить обновленные данные
        dispatch( DialogsActions.setMessages( dialogAfterDeleteMessage ) )// записать в стейт обновленный список сообщений
    }
}


export const getMyDialogListThunkCreator = (myId: number): ComThunkTp<DialogsActionTypes> => {//санкреатор получения моего диалогЛиста
    return async (dispatch, getState) => {// санка
        const myDialogList = await apiDialogs.getDialogListMyID( myId ) // получение моего диалогЛиста
        dispatch( DialogsActions.getMyDialogList( myDialogList ) )// записать в стейт мой диалоглист
    }
}

//updateDialogListThunkCreator(myId, response.userId, response.fullName, response.photos.small
export const updateDialogListThunkCreator = (userId1: number, userId2: number, Name2: string, Photo2: string): ComThunkTp<DialogsActionTypes> => {
    //санкреатор обновления диалогЛиста (моего когда я пишу кому то сообщение) - запись в localStorage.
    return async (dispatch, getState) => {// санка
        await apiDialogs.updateDialogListUserId( userId1, userId2, Name2, Photo2 ) // получение моего диалогЛиста
    }
}
export const deleteDialogThunkCreator = (dialogId: number, userId1: number, userId2: number): ComThunkTp<DialogsActionTypes> => {
    //санкреатор удаления диалога из диалогЛиста
    return async (dispatch, getState) => {// санка
        await apiDialogs.deleteDialog( dialogId, userId1, userId2 ) // получение моего диалогЛиста после удаления диалога
// записать в стейт не провожу - обновление раз в секунду
    }
}

export default dialogsReducer;

