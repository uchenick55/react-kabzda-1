import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../types/commonTypes";
import {apiDialog2} from "../components/api/api";
import {getDialog2MessagesType} from "../components/api/apiTypes";

const AAA = "myApp/dialog2-reducer/AAA";

export const Dialod2Actions = {

    getNewMessagesByUserId: (NewMessagesById: getDialog2MessagesType) => {
        return {type: AAA, NewMessagesById} as const
    }
}

type Dialog2ActionsTypes = InferActionsTypes<typeof Dialod2Actions>

const initialState = {}

type initialStateDialog2Type = typeof initialState

const Dialog2Reducer = (state: initialStateDialog2Type = initialState, action: Dialog2ActionsTypes): initialStateDialog2Type => {
    let stateCopy: initialStateDialog2Type // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {

        case AAA:
            stateCopy = {
                ...state,
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
export const getDialog2MessagesThCr = (userId: number, page: number = 1, count: number = 10): ThType => {
    console.log( "getDialog2MessagesThCr" )

    return async (dispatch, getState) => {//- получить список сообщений по id пользователя
        const response = await apiDialog2.getDialog2Messages( userId, page, count )
        console.log( response )

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
    console.log( "getDialog2MessageThCr" )
    return async (dispatch, getState) => {//
        const response = await apiDialog2.getDialog2MessagesNewerThen( userId, date )
        console.log( response ) //
    }
}

export default Dialog2Reducer
