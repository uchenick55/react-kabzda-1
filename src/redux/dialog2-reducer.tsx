import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../types/commonTypes";
import {apiDialog2} from "../components/api/api";

const CURRENT_DIALOG_ID = "myApp/dialog2-reducer/CURRENT_DIALOG_ID";

export const Dialod2Actions = {
    setCurrentDialogId: (currentDialogId: number) => {
        return {type: CURRENT_DIALOG_ID, currentDialogId} as const
    }
}

type Dialog2ActionsTypes = InferActionsTypes<typeof Dialod2Actions>

const initialState = {
    currentDialogId: 0
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
            return  stateCopy
        default:
            return state
    }
}

export const putDialog2StartActionCreator = (currentDialogId:number): ComThunkTp<Dialog2ActionsTypes> => {
    return async (dispatch, getState) => {
        const response = await apiDialog2.putDialog2Start(currentDialogId)
        if (response.resultCode === 0) {
            dispatch(Dialod2Actions.setCurrentDialogId(currentDialogId))
        }
    }
}

export default Dialog2Reducer
