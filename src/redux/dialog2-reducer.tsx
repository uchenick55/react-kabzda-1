import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../types/commonTypes";
import {apiDialog2} from "../components/api/api";
import {getDialog2AllType, newMessagesItem, sendMessageType} from "../components/api/apiTypes";
import {ResultCodeEnum} from "../components/api/enum";

const DIALOG2_ACTIONS = "myApp/dialog2-reducer/DIALOG2_ACTIONS";
const SET_MESSAGES_NEWER_THEN = "myApp/dialog2-reducer/SET_MESSAGES_NEWER_THEN";
const SET_DIALOG2_INITIALSTATE = "myApp/dialog2-reducer/SET_DIALOG2_INITIALSTATE";
const SET_D2_USERID = "myApp/dialog2-reducer/SET_D2_USERID";
const SET_D2_ITEM = "myApp/dialog2-reducer/SET_D2_ITEM";

export const Dialog2Actions = {

    getDialog2AllAC: (Dialog2All: getDialog2AllType) => {
        return {type: DIALOG2_ACTIONS, Dialog2All} as const
    },
    setMessagesNewerThen: (MessagesNewerThen: Array<sendMessageType>) => {
        return {type: SET_MESSAGES_NEWER_THEN, MessagesNewerThen} as const
    },
    setDialog2InitialState: () => {
        return {type: SET_DIALOG2_INITIALSTATE} as const
    },
    setD2UserId: (d2UserId:number) => {
        return {type: SET_D2_USERID, d2UserId} as const
    },
    setD2Item: (d2UserId:number) => {
        return {type: SET_D2_ITEM, d2UserId} as const
    }
}

type Dialog2ActionsTypes = InferActionsTypes<typeof Dialog2Actions>

const initialState = {
    Dialog2All: [] as getDialog2AllType,
    MessagesNewerThen: [] as Array<sendMessageType>,
    d2UserId: 0,
    D2Item: {} as newMessagesItem
}

type initialStateDialog2Type = typeof initialState

const Dialog2Reducer = (state: initialStateDialog2Type = initialState, action: Dialog2ActionsTypes): initialStateDialog2Type => {
    let stateCopy: initialStateDialog2Type // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case DIALOG2_ACTIONS: // список всех диалогов
            stateCopy = {
                ...state,
                Dialog2All: action.Dialog2All
            }
            return stateCopy
        case SET_MESSAGES_NEWER_THEN: // сообщения по выбранному диалогу новее определенной даты
            stateCopy = {
                ...state,
                MessagesNewerThen: action.MessagesNewerThen
            }
            return stateCopy
        case SET_DIALOG2_INITIALSTATE: // занулить стейт при логауте
            return initialState
        case SET_D2_USERID: // установить id текущего диалога
            stateCopy = {
                ...state,
                d2UserId: action.d2UserId
            }
            return stateCopy
        case SET_D2_ITEM: // отфильтровать DialogItem из Dialog2All
            stateCopy = {
                ...state,
                D2Item: state.Dialog2All.filter(d2=>d2.id===action.d2UserId)[0]
            }
            return stateCopy
        default:
            return state
    }
}

type ThType = ComThunkTp<Dialog2ActionsTypes> // тип, выведенный из общего типа санок сс учетом локального типа AC

export const putDialog2StartThCr = (currentDialogId: number): ThType => {
    return async (dispatch, getState) => {// начало диалога с пользователем по его ID
        const response = await apiDialog2.putDialog2Start( currentDialogId )
        if (response.resultCode===ResultCodeEnum.Success) {
            dispatch(getDialog2AllThCr(currentDialogId))
        }
    }
}
export const getDialog2AllThCr = (userId: number, page: number = 1, count: number = 10): ThType => {
   // console.log( "getDialog2AllThCr" )
    return async (dispatch, getState) => {//- получить список диалогов по id пользователя
        const response = await apiDialog2.getDialog2All( userId, page, count )
       // console.log( response )
        dispatch(Dialog2Actions.getDialog2AllAC(response))
    }
}
export const postDialog2MessageThCr = (userId: number, body: string, date: string): ThType => {
    console.log( "postDialog2MessageThCr" )
    return async (dispatch, getState) => {// - отправить сообщение пользователю
        const response = await apiDialog2.postDialog2Message( userId, body )
        if (response.resultCode===ResultCodeEnum.Success) {
           dispatch(getDialog2MessagesNewerThenThCr( userId, date)) // получить все сообщения от указанного ID пользователя новее чем указанная дата
        }
        console.log( response )
    }
}
export const getDialog2MessageIdViewedThCr = (messageId: string): ThType => {
    return async (dispatch, getState) => {//- проверить, было ли прочитано сообщение по Id сообщения
        const response = await apiDialog2.getDialog2MessageIdViewed( messageId )
        if (response.status===200) {
            console.log( "сообщение было прочитано" )
            console.log( response.data ) // boolean

        }
    }
}
export const postDialog2MessageIdToSpamThCr = (messageId: string): ThType => {
    console.log( "postDialog2MessageIdToSpamThCr" )
    return async (dispatch, getState) => {// - пометить сообщение как спам
        const response = await apiDialog2.postDialog2MessageIdToSpam( messageId )
        if (response.resultCode===ResultCodeEnum.Success) {
            console.log("Сообщение помечено как спам:", messageId )
        }
    }
}
export const deleteDialog2MessageIdThCr = (messageId: string, userId: number, date: string): ThType => {
    console.log( "deleteDialog2MessageIdThCr" )
    return async (dispatch, getState) => {//- удалить сообщение (только у себя) по ID сообщения
        const response = await apiDialog2.deleteDialog2MessageId( messageId )
        if (response.resultCode === ResultCodeEnum.Success) {
            console.log("Сообщение удалено" )
           dispatch( getDialog2MessagesNewerThenThCr (userId, date))
        }
    }
}
export const putDialog2MessageIdRestoreThCr = (messageId: string): ThType => {
    console.log( "putDialog2MessageIdRestoreThCr" )
    return async (dispatch, getState) => {//  - восстановить сообщение из спама и удаленных
        const response = await apiDialog2.putDialog2MessageIdRestore( messageId )
        if (response.resultCode===ResultCodeEnum.Success) {
            console.log("Сообщение восстановлено из спама")
        }
    }
}
export const getDialog2MessagesNewerThenThCr = (userId: number, date: string): ThType => {
   // console.log( "getDialog2MessagesNewerThenThCr" )
    return async (dispatch, getState) => {// - вернуть сообщения новее определенной даты
        const response = await apiDialog2.getDialog2MessagesNewerThen( userId, date )
        dispatch(Dialog2Actions.setMessagesNewerThen(response))
    }
}
export const getDailog2UnreadMessagesThCr = (): ThType => {
    console.log( "getDailog2UnreadMessagesThCr" )
    return async (dispatch, getState) => {// - вернуть количество непрочтенных сообщений
        const response = await apiDialog2.getDailog2UnreadMessages()
        console.log( response ) //
    }
}

export default Dialog2Reducer
