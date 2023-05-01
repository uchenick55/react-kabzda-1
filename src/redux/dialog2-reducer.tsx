import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../types/commonTypes";
import {apiDialog2} from "../components/api/api";
import {getDialog2MessagesType} from "../components/api/apiTypes";

const SET_NEW_MESSAGES_BY_ID = "myApp/dialog2-reducer/SET_NEW_MESSAGES_BY_ID";

export const Dialod2Actions = {

    getNewMessagesByUserId: (NewMessagesById: getDialog2MessagesType) => {
        return {type: SET_NEW_MESSAGES_BY_ID, NewMessagesById} as const
    }
}

type Dialog2ActionsTypes = InferActionsTypes<typeof Dialod2Actions>

const initialState = {
    currentDialogId: 0,
    NewMessagesById: [] as getDialog2MessagesType
}

type initialStateDialog2Type = typeof initialState

const Dialog2Reducer = (state: initialStateDialog2Type = initialState, action: Dialog2ActionsTypes): initialStateDialog2Type => {
    let stateCopy: initialStateDialog2Type // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {

        case SET_NEW_MESSAGES_BY_ID:
            stateCopy = {
                ...state,
                NewMessagesById: action.NewMessagesById
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
        if (response.resultCode === 0) {
            console.log(response)
        }
    }
}
export const getDialog2MessagesThCr = (userId: number, page: number = 1, count: number = 10): ThType => {
    console.log("getDialog2MessagesThCr")

    return async (dispatch, getState) => {//- получить список сообщений по id пользователя
        const response = await apiDialog2.getDialog2Messages( userId, page, count )
        dispatch( Dialod2Actions.getNewMessagesByUserId( response ) )
        console.log(response)

    }
}
export const postDialog2MessageThCr = (userId: number, body: string): ThType => {
    console.log("postDialog2MessageThCr")
    return async (dispatch, getState) => {// - отправить сообщение пользователю
        const response = await apiDialog2.postDialog2Message( userId, body )
        console.log(response)
    }
}
export const getDialog2MessageIdViewedThCr = (messageId: string): ThType => {
    console.log("getDialog2MessageIdViewedThCr")
    return async (dispatch, getState) => {//- проверить, было ли прочитано сообщение по Id сообщения
        const response = await apiDialog2.getDialog2MessageIdViewed(messageId)
        console.log(response) // boolean
    }
}
export const postDialog2MessageIdToSpamThCr = (messageId: string): ThType => {
    console.log("postDialog2MessageIdToSpamThCr")
    return async (dispatch, getState) => {// - отправить сообщение пользователю
        const response = await apiDialog2.postDialog2MessageIdToSpam( messageId )
        console.log(response)
    }
}

export default Dialog2Reducer
