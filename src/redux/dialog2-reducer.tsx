import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../types/commonTypes";
import {apiDialog2} from "../components/api/api";
import {getDialog2AllType} from "../components/api/apiTypes";

const DIALOG2_ACTIONS = "myApp/dialog2-reducer/DIALOG2_ACTIONS";

export const Dialog2Actions = {

    getDialog2AllAC: (Dialog2All: getDialog2AllType) => {
        return {type: DIALOG2_ACTIONS, Dialog2All} as const
    }
}

type Dialog2ActionsTypes = InferActionsTypes<typeof Dialog2Actions>

const initialState = {
    Dialog2All: [] as getDialog2AllType
}

type initialStateDialog2Type = typeof initialState

const Dialog2Reducer = (state: initialStateDialog2Type = initialState, action: Dialog2ActionsTypes): initialStateDialog2Type => {
    let stateCopy: initialStateDialog2Type // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {

        case DIALOG2_ACTIONS:
            stateCopy = {
                ...state,
                Dialog2All: action.Dialog2All
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
        console.log( response )
    }
}
export const getDialog2AllThCr = (userId: number, page: number = 1, count: number = 10): ThType => {
    console.log( "getDialog2AllThCr" )

    return async (dispatch, getState) => {//- получить список диалогов по id пользователя
        const response = await apiDialog2.getDialog2All( userId, page, count )
        console.log( response )
        dispatch(Dialog2Actions.getDialog2AllAC(response))
    }
}
export const postDialog2MessageThCr = (userId: number, body: string): ThType => {
    console.log( "postDialog2MessageThCr" )
    return async (dispatch, getState) => {// - отправить сообщение пользователю
        const response = await apiDialog2.postDialog2Message( userId, body )
        console.log( response )
    }
}
export const getDialog2MessageIdViewedThCr = (messageId: string): ThType => {
    console.log( "getDialog2MessageIdViewedThCr" )
    return async (dispatch, getState) => {//- проверить, было ли прочитано сообщение по Id сообщения
        const response = await apiDialog2.getDialog2MessageIdViewed( messageId )
        console.log( response ) // boolean
    }
}
export const postDialog2MessageIdToSpamThCr = (messageId: string): ThType => {
    console.log( "postDialog2MessageIdToSpamThCr" )
    return async (dispatch, getState) => {// - пометить сообщение как спам
        const response = await apiDialog2.postDialog2MessageIdToSpam( messageId )
        console.log( response )
    }
}
export const deleteDialog2MessageIdThCr = (messageId: string): ThType => {
    console.log( "deleteDialog2MessageIdThCr" )
    return async (dispatch, getState) => {//- удалить сообщение (только у себя) по ID сообщения
        const response = await apiDialog2.deleteDialog2MessageId( messageId )
        console.log( response )
    }
}
export const putDialog2MessageIdRestoreThCr = (messageId: string): ThType => {
    console.log( "putDialog2MessageIdRestoreThCr" )
    return async (dispatch, getState) => {//  - восстановить сообщение из спама и удаленных
        const response = await apiDialog2.putDialog2MessageIdRestore( messageId )
        console.log( response )
    }
}
export const getDialog2MessagesNewerThenThCr = (userId: number, date: string): ThType => {
    console.log( "getDialog2MessagesNewerThenThCr" )
    return async (dispatch, getState) => {// - вернуть сообщения новее определенной даты
        const response = await apiDialog2.getDialog2MessagesNewerThen( userId, date )
        console.log( response ) //
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
