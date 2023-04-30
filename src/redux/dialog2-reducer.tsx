import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../types/commonTypes";
import {apiDialog2} from "../components/api/api";
import {getDialog2MessagesType} from "../components/api/apiTypes";

const CURRENT_DIALOG_ID = "myApp/dialog2-reducer/CURRENT_DIALOG_ID";
const SET_NEW_MESSAGES_BY_ID = "myApp/dialog2-reducer/SET_NEW_MESSAGES_BY_ID";

export const Dialod2Actions = {
    setCurrentDialogId: (currentDialogId: number) => {
        return {type: CURRENT_DIALOG_ID, currentDialogId} as const
    },
    setNewMessagesById: (NewMessagesById: getDialog2MessagesType) => {
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
        case CURRENT_DIALOG_ID:
            stateCopy = {
                ...state,
                currentDialogId: action.currentDialogId
            }
            return stateCopy
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

export const putDialog2StartActionCreator = (currentDialogId: number): ComThunkTp<Dialog2ActionsTypes> => {
    return async (dispatch, getState) => {
        const response = await apiDialog2.putDialog2Start( currentDialogId )
        if (response.resultCode === 0) {
            dispatch( Dialod2Actions.setCurrentDialogId( currentDialogId ) )
        }
    }
}
export const getDialog2MessagesActionCreator = (userId: number, page: number = 1, count: number = 10): ComThunkTp<Dialog2ActionsTypes> => {
    return async (dispatch, getState) => {
        const response = await apiDialog2.getDialog2Messages( userId, page, count )
        dispatch( Dialod2Actions.setNewMessagesById( response ) )
    }
}

export default Dialog2Reducer
