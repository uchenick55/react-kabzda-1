import {InferActionsTypes} from "./store-redux";
import {ComThunkTp} from "../types/commonTypes";
import {apiDialog2} from "../components/api/api";

const AAA = "myApp/dialog2-reducer/AAA";

export const Dialod2Actions = {
    setAaa: () => {
        return {type: AAA} as const
    }
}

type Dialog2ActionsTypes = InferActionsTypes<typeof Dialod2Actions>

const initialState = {

}

type initialStateDialog2Type = typeof initialState

const Dialog2Reducer = (state: initialStateDialog2Type = initialState, action: Dialog2ActionsTypes): initialStateDialog2Type => {
    let stateCopy: initialStateDialog2Type // объявлениечасти части стейта до изменения редьюсером
    switch (action.type) {
        case AAA:
            stateCopy = {
                ...state
            }
            return  stateCopy
        default:
            return state
    }
}

export const putDialogStartActionCreator = (): ComThunkTp<Dialog2ActionsTypes> => {
    return async (dispatch, getState) => {
        const response = await apiDialog2.putDialogStart(27045)
        console.log(response)
    }
}
